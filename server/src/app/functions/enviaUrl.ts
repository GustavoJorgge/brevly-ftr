import { db } from "@/infra/db";
import { z } from "zod";
import { schema } from "@/infra/db/schemas";
import { inputLinkToStorage } from "@/infra/storage/input-link-to-storage";

const linkInputSchema = z.object({
  originalUrl: z.string(),
  shortUrl: z.string(),
  remoteKey: z.string(),
});

type LinkInput = z.infer<typeof linkInputSchema>;

export async function enviaUrl(input: LinkInput) {
  const { originalUrl, shortUrl, remoteKey } = linkInputSchema.parse(input);

  // Salva no Cloudflare R2
  await inputLinkToStorage({
    originalUrl,
    shortUrl,
    remoteKey,
    contentType: "application/json",
  });

  // Salva no banco
  await db.insert(schema.links).values({
    originalUrl,
    shortUrl,
    remoteKey,
  });
}
