import { deleteLink } from '@/app/functions/delete-link'
import { exportLinks } from '@/app/functions/export-links-csv'
import { getLinkById } from '@/app/functions/get-link-byId'
import { getLink } from '@/app/functions/get-uploads'
import { inputLink } from '@/app/functions/input-link'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, unwrapEither } from '@/infra/shared/either'
import { desc, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const linksRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Gerar Link',
        body: z.object({
          originalUrl: z.string(),
          shortUrl: z.string(),
        }),
        response: {
          200: z.object({
            originalUrl: z.string(),
            urlNova: z.string(),
            qtdAcesso: z.number(),
          }),
          409: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body

      const existShortUrl = (
        await db
          .select()
          .from(schema.links)
          .where(eq(schema.links.shortUrl, shortUrl))
      )[0]

      if (existShortUrl) {
        return reply
          .status(409)
          .send({ message: 'Url encurtada já existe na base.' })
      }

      const newLink = await inputLink({
        originalUrl,
        shortUrl,
      })

      // Buscar o link recém-criado para obter todos os dados incluindo qtdAcesso
      const createdLink = await db
        .select({
          originalUrl: schema.links.originalUrl,
          shortUrl: schema.links.shortUrl,
          qtdAcesso: schema.links.qtdAcesso,
        })
        .from(schema.links)
        .where(eq(schema.links.shortUrl, shortUrl))
        .limit(1)

      const linkData = createdLink[0]

      return reply.status(200).send({
        originalUrl: linkData.originalUrl,
        urlNova: linkData.shortUrl,
        qtdAcesso: linkData.qtdAcesso || 0,
      })
    },
  )

  server.get(
    '/links',
    {
      schema: {
        summary: 'Busca todos os links gerados.',
        description:
          'Retorna uma lista com todos os links encurtados ordenados por data de criação (mais recentes primeiro)',
        querystring: z.object({
          searchQuery: z.string().optional(),
          sortBy: z.enum(['createdAt']).optional(),
          sortDirection: z.enum(['asc', 'desc']).optional(),
          page: z.coerce.number().optional().default(1),
          pageSize: z.coerce.number().optional().default(20),
        }),
        response: {
          200: z.object({
            links: z.array(
              z.object({
                urlId: z.string(),
                originalUrl: z.string(),
                shortUrl: z.string(),
                createdAt: z.date(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page, pageSize, searchQuery, sortBy, sortDirection } =
        request.query

      const links = await getLink({
        page,
        pageSize,
        searchQuery,
        sortBy,
        sortDirection,
      })

      return reply.status(200).send({ links })
    },
  )

  server.post(
    '/links/exports',
    {
      schema: {
        summary: 'Exporta Links em csv.',
        description:
          'Retorna uma lista com todos os links encurtados ordenados por data de criação (mais recentes primeiro)',
        querystring: z.object({
          searchQuery: z.string().optional(),
        }),
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery } = request.query

      const result = await exportLinks({
        searchQuery,
      })

      const { reportUrl } = unwrapEither(result)
      return reply.status(200).send({ reportUrl })
    },
  )

  server.delete(
    '/links/:id',
    {
      schema: {
        summary: 'Delete a link by ID',
        params: z.object({
          id: z.string().nonempty(),
        }),
        tags: ['links'],
        response: {
          204: z.null(),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await deleteLink({
        urlId: request.params.id,
      })

      if (isLeft(result)) {
        const unwrapedResult = unwrapEither(result)

        return reply.status(404).send({ message: unwrapedResult.message })
      }

      return reply.status(204).send()
    },
  )

  server.get(
    '/links/:id',
    {
      schema: {
        summary: 'Buscar link por ID',
        description: 'Retorna um link específico pelo seu ID',
        params: z.object({
          id: z.string().nonempty(),
        }),
        tags: ['links'],
        response: {
          200: z.object({
            urlId: z.string(),
            originalUrl: z.string(),
            shortUrl: z.string(),
            createdAt: z.date(),
            qtdAcesso: z.number().optional(), // caso exista esse campo
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await getLinkById({
        urlId: request.params.id,
      })

      if (isLeft(result)) {
        const unwrapedResult = unwrapEither(result)

        return reply.status(404).send({ message: unwrapedResult.message })
      }

      const link = unwrapEither(result)
      return reply.status(200).send(link)
    },
  )

  server.get(
    '/links/short/:shortUrl',
    {
      schema: {
        summary: 'Buscar link por URL encurtada',
        description: 'Retorna os dados do link através da URL encurtada',
        params: z.object({
          shortUrl: z.string().nonempty(),
        }),
        tags: ['links'],
        response: {
          200: z.object({
            urlId: z.string(),
            originalUrl: z.string(),
            shortUrl: z.string(),
            createdAt: z.date(),
            qtdAcesso: z.number().optional(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params

      try {
        const result = await db
          .select({
            urlId: schema.links.urlId,
            originalUrl: schema.links.originalUrl,
            shortUrl: schema.links.shortUrl,
            createdAt: schema.links.createdAt,
            qtdAcesso: schema.links.qtdAcesso,
          })
          .from(schema.links)
          .where(eq(schema.links.shortUrl, shortUrl))
          .limit(1)

        if (result.length === 0) {
          return reply.status(404).send({
            message: 'Link encurtado não encontrado',
          })
        }

        return reply.status(200).send(result[0])
      } catch (error) {
        return reply.status(500).send({
          message: 'Erro interno do servidor',
        })
      }
    },
  )
}
