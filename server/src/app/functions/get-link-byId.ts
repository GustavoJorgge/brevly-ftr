import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/infra/shared/either";
import { eq } from "drizzle-orm";
import { z } from "zod";

const getLinkByIdInput = z.object({
  urlId: z.string(),
});

type GetLinkByIdInput = z.input<typeof getLinkByIdInput>;

type LinkOutput = {
  urlId: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
  qtdAcesso?: number;
};

export async function getLinkById(
  input: GetLinkByIdInput
): Promise<Either<{ message: string }, LinkOutput>> {
  const { urlId } = getLinkByIdInput.parse(input);

  const link = await db
    .select({
      urlId: schema.links.urlId,
      originalUrl: schema.links.originalUrl,
      shortUrl: schema.links.shortUrl,
      createdAt: schema.links.createdAt,
      qtdAcesso: schema.links.qtdAcesso,
    })
    .from(schema.links)
    .where(eq(schema.links.urlId, urlId))
    .limit(1);

  if (link.length === 0) {
    return makeLeft({ message: "Link não encontrado" });
  }

  return makeRight(link[0]);
}
