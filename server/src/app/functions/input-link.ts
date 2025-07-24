import { db } from "@/infra/db";
import { z } from "zod";
import { schema } from "@/infra/db/schemas";
import { inputLinkToStorage } from "@/infra/storage/input-link-to-storage";

const linkInputSchema = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string().url(),
});

type LinkInput = z.infer<typeof linkInputSchema>;

export async function inputLink(input: LinkInput) {
  const { originalUrl, shortUrl } = linkInputSchema.parse(input);

  // Salva no Cloudflare R2
  await inputLinkToStorage({
    originalUrl,
    shortUrl,
    contentType: "application/json",
  });

  // Salva no banco
  await db.insert(schema.links).values({
    originalUrl,
    shortUrl,
  });
}
