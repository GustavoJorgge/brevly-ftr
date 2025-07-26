import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { count, eq } from 'drizzle-orm'
import { z } from 'zod'

const deleteLinkByShortUrlInput = z.object({
  shortUrl: z.string(),
})

type DeleteLinkByShortUrlInput = z.input<typeof deleteLinkByShortUrlInput>

export async function deleteLinkByShortUrl(
  input: DeleteLinkByShortUrlInput,
): Promise<Either<{ message: string }, { shortUrl: string }>> {
  const { shortUrl } = deleteLinkByShortUrlInput.parse(input)

  const exists = await db
    .select({ count: count() })
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))

  if (exists[0].count === 0) {
    return makeLeft({
      message: 'Link com essa URL encurtada não foi encontrado',
    })
  }

  await db.delete(schema.links).where(eq(schema.links.shortUrl, shortUrl))

  return makeRight({ shortUrl })
}
