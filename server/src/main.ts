import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { configService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyCookie from 'fastify-cookie';
import { fastifyHelmet } from 'fastify-helmet';
import { AllExceptionFilter } from './common/exceptions';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const PORT = configService.getAppPort();

  // set global controller with prefix api
  app.setGlobalPrefix('api');

  // set up nest swagger
  if (!configService.isProduction()) {
    const swaggerDocument = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Manager API')
        .setDescription('Tan Blog Manager API')
        .build(),
    );

    SwaggerModule.setup('docs', app, swaggerDocument);
  }

  // enable cors
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,POST,PATCH,DELETE,OPTIONS,MOBILE',
    credentials: true,
  });

  // add fastify cookie
  app.register(fastifyCookie);

  // add fastify helmet
  app.register(fastifyHelmet);

  // add exception filter for app
  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(PORT);
}
bootstrap();
