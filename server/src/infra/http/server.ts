import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import { env } from "./../env";
import {
  serializerCompiler,
  validatorCompiler,
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { InputLinkRoute } from "./routes/inputLinkRoute";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

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

// Cadastrando Swagger na aplicação
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Encurta Link",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.register(InputLinkRoute);

console.log(env.DATABASE_URL);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running");
});
