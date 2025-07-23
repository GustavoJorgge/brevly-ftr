import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { enviaUrl } from "@/app/enviaUrl";

export const InputLinkRoute: FastifyPluginAsyncZod = async (server) => {
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
          409: z
            .object({ message: z.string() })
            .describe("URL já cadastrada na base."),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body;

      const remoteKey = shortUrl.replace(/^https?:\/\//, "");

      await enviaUrl({
        originalUrl,
        shortUrl,
        remoteKey,
      });
      return reply.status(200).send({ urlNova: shortUrl });
    }
  );
};
