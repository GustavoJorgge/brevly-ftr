import { db } from "@/infra/db";
import { z } from "zod";
import { schema } from "@/infra/db/schemas";

const linkInputSchema = z.object({
  originalUrl: z.string(),
  shortUrl: z.string(),
  remoteKey: z.string(),
});

type LinkInput = z.infer<typeof linkInputSchema>;

export async function enviaUrl(input: LinkInput) {
  const { originalUrl, shortUrl, remoteKey } = linkInputSchema.parse(input);

  await db.insert(schema.links).values({
    originalUrl,
    shortUrl,
    remoteKey,
  });
}
