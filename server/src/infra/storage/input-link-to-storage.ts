import { randomUUID } from "crypto";
import { z } from "zod";
import { r2 } from "./client";
import { Upload } from "@aws-sdk/lib-storage";
import { env } from "../env";

const inputLinkToStorageSchema = z.object({
  originalUrl: z.string(),
  shortUrl: z.string(),
  remoteKey: z.string(),
  contentType: z.string(),
});

type InputLinkToStorageSchema = z.input<typeof inputLinkToStorageSchema>;

export async function inputLinkToStorage(input: InputLinkToStorageSchema) {
  const { originalUrl, shortUrl, remoteKey, contentType } =
    inputLinkToStorageSchema.parse(input);

  const uniqueName = `${randomUUID()}-${shortUrl}`;

  const content = JSON.stringify({
    originalUrl,
    shortUrl,
    remoteKey,
    createdAt: new Date().toISOString(),
  });

  const upload = new Upload({
    client: r2,
    params: {
      Key: uniqueName,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: content,
      ContentType: contentType,
    },
  });

  await upload.done();
}
