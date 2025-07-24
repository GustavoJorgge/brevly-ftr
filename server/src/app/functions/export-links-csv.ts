import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeRight } from "@/infra/shared/either";
import { exportLinksCsvStorage } from "@/infra/storage/export-links-csv";
import { stringify } from "csv-stringify";
import { ilike } from "drizzle-orm";
import { z } from "zod";

const exportLinksInput = z.object({
  searchQuery: z.string().optional(),
});

type ExportLinksInput = z.input<typeof exportLinksInput>;

type ExportLinksOutput = {
  reportUrl: string;
};

export async function exportLinks(
  input: ExportLinksInput
): Promise<Either<never, ExportLinksOutput>> {
  const { searchQuery } = exportLinksInput.parse(input);

  const { sql, params } = db
    .select({
      urlId: schema.links.urlId,
      originalUrl: schema.links.originalUrl,
      shortUrl: schema.links.shortUrl,
      createdAt: schema.links.createdAt,
      qtdAcesso: schema.links.qtdAcesso,
    })
    .from(schema.links)
    .where(
      searchQuery
        ? ilike(schema.links.originalUrl, `%${searchQuery}%`)
        : undefined
    )
    .toSQL();

  const cursor = pg.unsafe(sql, params as string[]).cursor(1);

  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      { key: "urlId", header: "ID" },
      { key: "originalUrl", header: "URL Original" },
      { key: "shortUrl", header: "URL Encurtada" },
      { key: "createdAt", header: "Data de Criação" },
      { key: "qtdAcesso", header: "Quantidade de Acessos" },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  await pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], _, callback) {
        console.log(`Processando ${chunks.length} registros`);
        for (const chunk of chunks) {
          this.push(chunk);
        }
        callback();
      },
    }),
    csv,
    uploadToStorageStream
  );

  const uploadPromise = exportLinksCsvStorage({
    contentType: "text/csv",
    folder: "downloads",
    fileName: `${new Date().toISOString()}-links.csv`,
    contentStream: uploadToStorageStream,
  });

  const { url } = await uploadPromise;

  return makeRight({ reportUrl: url });
}
