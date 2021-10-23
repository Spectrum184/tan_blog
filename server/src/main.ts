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
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    // {
    //   logger: false,
    // },
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
        .setVersion('1.0')
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
  app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  //validation data type
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // add exception filter for app
  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(PORT, () => console.log('Server is listening on ' + PORT));
}
bootstrap();
