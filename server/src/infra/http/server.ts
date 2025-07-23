import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import { env } from "./../env";
import {
  serializerCompiler,
  validatorCompiler,
  hasZodFastifySchemaValidationErrors,
} from "fastify-type-provider-zod";
import { InputLinkRoute } from "./routes/post-link";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Erro de validação na requisição",
      issues: error.validation,
    });
  }

  console.error(error);

  return reply.status(500).send({ message: "Erro interno." });
});

server.register(fastifyCors, { origin: "*" });

server.register(InputLinkRoute);

console.log(env.DATABASE_URL);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running");
});
