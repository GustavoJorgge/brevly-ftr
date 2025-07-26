import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { inputLinkToStorage } from '@/infra/storage/input-link-to-storage'
import { z } from 'zod'

const linkInputSchema = z.object({
  originalUrl: z.string().url('O Link completo deve ser um URL Valido!'),
  shortUrl: z.string(),
})

type LinkInput = z.infer<typeof linkInputSchema>

export async function inputLink(input: LinkInput) {
  const { originalUrl, shortUrl } = linkInputSchema.parse(input)

  // Salva no Cloudflare R2
  await inputLinkToStorage({
    originalUrl,
    shortUrl,
    contentType: 'application/json',
  })

  // Salva no banco
  await db.insert(schema.links).values({
    originalUrl,
    shortUrl,
  })
}
