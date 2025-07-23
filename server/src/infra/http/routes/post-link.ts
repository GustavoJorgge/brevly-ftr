import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const InputLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/link", () => {
    return "Input Link";
  });
};
