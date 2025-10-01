import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { exportLinksCsvStorage } from "@/infra/storage/export-links-csv";
import { stringify } from "csv-stringify/sync";
import { Readable } from "node:stream";
import { z } from "zod";
import { makeRight } from "@/infra/shared/either";

const exportLinksInput = z.object({
  searchQuery: z.string().optional(),
});

type ExportLinksInput = z.input<typeof exportLinksInput>;

type ExportLinksOutput = {
  reportUrl: string;
};

export async function exportLinks(
  input: ExportLinksInput
): Promise<ReturnType<typeof makeRight<ExportLinksOutput>>> {
  const { searchQuery } = exportLinksInput.parse(input);

  // Busca todos os links (pode adaptar paginação se necessário)
  const rows = await db
    .select({
      urlId: schema.links.urlId,
      originalUrl: schema.links.originalUrl,
      shortUrl: schema.links.shortUrl,
      createdAt: schema.links.createdAt,
      qtdAcesso: schema.links.qtdAcesso,
    })
    .from(schema.links)
    .orderBy(schema.links.createdAt);

  // Mapeia e garante strings para evitar colunas vazias
  const records = rows.map((r) => ({
    ID: r.urlId ?? "",
    "URL Original": r.originalUrl ?? "",
    "URL Encurtada": r.shortUrl ?? "",
    "Data de Criação": r.createdAt
      ? new Date(r.createdAt).toLocaleString("pt-BR")
      : "",
    "Quantidade de Acessos":
      typeof r.qtdAcesso === "number" ? String(r.qtdAcesso) : "0",
  }));

  // Gera CSV com cabeçalho
  const csvString = stringify(records, {
    header: true,
    columns: [
      "ID",
      "URL Original",
      "URL Encurtada",
      "Data de Criação",
      "Quantidade de Acessos",
    ],
  });

  // Adiciona BOM UTF-8 para evitar problemas com acentuação no Excel
  const bom = Buffer.from("\uFEFF", "utf8");
  const csvBuffer = Buffer.concat([bom, Buffer.from(csvString, "utf8")]);

  // Cria stream legível a partir do buffer
  const stream = Readable.from(csvBuffer);

  // Envia para storage
  const fileName = `links-${new Date().toISOString()}.csv`;
  const { url } = await exportLinksCsvStorage({
    fileName,
    contentStream: stream,
    contentType: "text/csv; charset=utf-8",
    folder: "downloads",
  });

  return makeRight({ reportUrl: url });
}
