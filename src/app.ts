import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

export function buildApp() {
  const app = fastify();

  app.register(fastifyCors);

  return app;
}
