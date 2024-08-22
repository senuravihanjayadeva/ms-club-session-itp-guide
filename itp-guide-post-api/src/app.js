import Fastify from 'fastify';
import pino from 'pino';
import pretty from 'pino-pretty';
import prismaPlugin from './api/plugins/prisma-plugin';
import api from './api';

const logger = pino(
  pretty({
    colorize: true,
    levelFirst: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname',
  }),
);

const createServer = async () => {
  const fastify = Fastify({ logger: logger, disableRequestLogging: true });

  fastify.get('/', async (request, reply) => {
    return reply
      .status(200)
      .send({
        title: 'Posts API',
        version: '1.0.0',
        status: 'ok',
        environment: process.env.NODE_ENV,
      });
  });

  try {
    await fastify.register(prismaPlugin);
    const apiServer = await api(fastify);
    return await apiServer.start();
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

createServer();
