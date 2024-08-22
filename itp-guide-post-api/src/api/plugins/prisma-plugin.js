import { PrismaClient } from '@prisma/client';
import fp from 'fastify-plugin';

const prismaPlugin = fp(async (server) => {
  const prisma = new PrismaClient({
    log: ['info', 'query', 'warn', 'error'],
  });

  await prisma.$connect();

  server.decorate('prisma', prisma);
  server.addHook('onRequest', async (request, reply) => {
    request.prisma = prisma;
  });
  server.addHook('onClose', async (server) => {
    await server.prisma.$disconnect();
  });
});

export default prismaPlugin;
