import { Upload } from "@aws-sdk/lib-storage";
import { randomUUID } from "node:crypto";
import { basename, extname } from "node:path";
import { Readable } from "node:stream";
import { env } from "../env";
import { r2 } from "./client";
import { z } from "zod";

const exportLinksScvStorage = z.object({
  fileName: z.string(),
  contentStream: z.instanceof(Readable),
  contentType: z.string(),
  folder: z.enum(["links", "downloads"]),
});

type ExportLinksScvStorage = z.input<typeof exportLinksScvStorage>;

export async function exportLinksCsvStorage({
  fileName,
  contentStream,
  contentType,
  folder,
}: ExportLinksScvStorage): Promise<{ url: string; key: string }> {
  // Sanitiza o nome do arquivo similar ao código de referência
  const fileExtension = extname(fileName);
  const fileNameWithoutExtension = basename(fileName, fileExtension);

  const sanitizedFileName = fileNameWithoutExtension.replace(
    /[^a-zA-Z0-9-]/g,
    ""
  );
  const sanitizedFileNameWithExtension =
    sanitizedFileName.concat(fileExtension);

  // Cria um nome único com UUID
  const uniqueName = `${folder}/${randomUUID()}-${sanitizedFileNameWithExtension}`;

  const upload = new Upload({
    client: r2,
    params: {
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: uniqueName,
      Body: contentStream,
      ContentType: contentType,
    },
  });

  await upload.done();

  return {
    key: uniqueName,
    // CORREÇÃO: adicionar o prefixo storage-link-csv na URL
    url: new URL(
      `storage-link-csv/${uniqueName}`,
      env.CLOUDFLARE_PUBLIC_URL
    ).toString(),
  };
}
