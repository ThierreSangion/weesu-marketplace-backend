/* eslint-disable @typescript-eslint/quotes */
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import 'dotenv/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap(): Promise<void> {
  const app = await initializeApp();
  const version = process.env.npm_package_version as string;
  await initializeAPI(app, version);
}

async function initializeApp() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.enableCors({ allowedHeaders: '*', exposedHeaders: '*' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health-check', method: RequestMethod.GET }]
  });

  const version = process.env.npm_package_version as string;

  const config = new DocumentBuilder()
    .setTitle('Search API Swagger')
    .setDescription(`
      The Search API manage description
    `)
    .setVersion(version)
    .addTag('Search')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Search Swagger'
  });

  return app;
}


async function initializeAPI(app: NestFastifyApplication, version: string) {
  const port = process.env.BACKEND_PORT ?? 3000;
  await app.listen(port, '0.0.0.0').then(() => {
    console.log(`@search-api v${version} | started on port ${port}`);
  });
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
