import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { enviaUrl } from "@/app/functions/enviaUrl";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { desc, eq } from "drizzle-orm";
import { getLink } from "@/app/functions/get-uploads";

export const linksRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links",
    {
      schema: {
        summary: "Gerar Link",
        body: z.object({
          originalUrl: z.string(),
          shortUrl: z.string(),
        }),
        response: {
          200: z.object({ urlNova: z.string() }),
          409: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body;

      const existShortUrl = (
        await db
          .select()
          .from(schema.links)
          .where(eq(schema.links.shortUrl, shortUrl))
      )[0];

      if (existShortUrl) {
        return reply
          .status(409)
          .send({ message: "Url encurtada já existe na base." });
      }

      await enviaUrl({
        originalUrl,
        shortUrl,
      });

      return reply.status(200).send({ urlNova: shortUrl });
    }
  );

  server.get(
    "/links",
    {
      schema: {
        summary: "Busca todos os links gerados.",
        description:
          "Retorna uma lista com todos os links encurtados ordenados por data de criação (mais recentes primeiro)",
        querystring: z.object({
          searchQuery: z.string().optional(),
          sortBy: z.enum(["createdAt"]).optional(),
          sortDirection: z.enum(["asc", "desc"]).optional(),
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
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page, pageSize, searchQuery, sortBy, sortDirection } =
        request.query;

      const links = await getLink({
        page,
        pageSize,
        searchQuery,
        sortBy,
        sortDirection,
      });

      return reply.status(200).send({ links });
    }
  );
};
