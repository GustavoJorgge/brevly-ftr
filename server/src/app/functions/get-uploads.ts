import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { asc, desc, ilike } from 'drizzle-orm'
import { z } from 'zod'

const getLinkInput = z.object({
  searchQuery: z.string().optional(),
  sortBy: z.enum(['createdAt']).optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(20),
})

type GetLinkInput = z.input<typeof getLinkInput>

type GetLinkOutput = {
  urlId: string
  originalUrl: string
  shortUrl: string
  createdAt: Date
}[]

export async function getLink(input: GetLinkInput): Promise<GetLinkOutput> {
  const { page, pageSize, searchQuery, sortBy, sortDirection } =
    getLinkInput.parse(input)

  const whereClause = searchQuery
    ? ilike(schema.links.originalUrl, `%${searchQuery}%`)
    : undefined

  const links = await db
    .select({
      urlId: schema.links.urlId,
      originalUrl: schema.links.originalUrl,
      shortUrl: schema.links.shortUrl,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .where(whereClause)
    .orderBy(() => {
      if (sortBy && sortDirection === 'asc') {
        return asc(schema.links[sortBy])
      }
      if (sortBy && sortDirection === 'desc') {
        return desc(schema.links[sortBy])
      }
      return desc(schema.links.urlId) // Ordenação padrão
    })
    .offset((page - 1) * pageSize)
    .limit(pageSize)

  return links
}
