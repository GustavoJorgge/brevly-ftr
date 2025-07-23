import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { links } from "./../../db/schemas/links";

export const InputLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/link",
    {
      schema: {
        summary: "Input Link",
        body: z.object({
          urlOriginal: z.string(),
          urlNova: z.string().optional(),
        }),
        response: {
          200: z.object({ urlNova: z.string() }),
          409: z
            .object({ message: z.string() })
            .describe("URL ja cadastrada na base."),
        },
      },
    },
    async (request, reply) => {
      await db.insert(schema.links).values({
        originalUrl: "http://teste.com.br",
        remoteKey: "teste.com.br",
        shortUrl: "http://teste.com.br",
      });
      return reply.status(200).send({ urlNova: "gerado corretamente" });
    }
  );
};
