import { FastifyRequest } from 'fastify';
import { IApplication } from '../src/decorators/IApplication'
declare module 'fastify' {
  interface FastifyRequest {
    application: IApplication;
  }
}
