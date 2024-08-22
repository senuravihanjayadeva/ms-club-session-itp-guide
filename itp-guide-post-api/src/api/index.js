import { dirname, join, resolve } from 'path';
import cors from '@fastify/cors';
import fastifyAutoload from '@fastify/autoload';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const api = async (fastify) => {
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Fastify API',
        version: '1.0.0',
      },
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
  });

  await fastify.register(
    async function apiRouter(fastify) {
      fastify.register(cors, {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Content-Type', 'Authorization'],
      });

      await fastify.register(fastifyAutoload, {
        dir: resolve(join(dirname(__dirname), './api/domains')),
        matchFilter: /router\.[tj]s$/,
        routeParams: true,
      });
    },
    {
      prefix: '/api',
    },
  );

  return {
    container: fastify,
    start: async () =>
      await fastify.listen({
        host: 'localhost',
        port: 4000,
      }),
    close: async () => await server.close(),
    ready: async () => await server.ready(),
  };
};

export default api;
