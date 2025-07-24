import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/infra/shared/either";
import { count, eq } from "drizzle-orm";
import { z } from "zod";

const deleteLinkInput = z.object({
  urlId: z.string(),
});

type DeleteLinkInput = z.input<typeof deleteLinkInput>;

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<{ message: string }, { urlId: string }>> {
  const { urlId } = deleteLinkInput.parse(input);
  const exists = await db
    .select({ count: count() })
    .from(schema.links)
    .where(eq(schema.links.urlId, urlId));

  if (exists[0].count === 0) {
    return makeLeft({ message: "Link não encontrado" });
  }

  await db.delete(schema.links).where(eq(schema.links.urlId, urlId));

  return makeRight({ urlId });
}
