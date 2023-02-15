import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = +process.env.PORT! || 8080;
  const serverUrl =
    process.env.NODE_ENV == 'production' && !!process.env.BASE_URL
      ? process.env.BASE_URL
      : `http://localhost:${port}`;

  const corsWhitelist = [process.env.FRONTEND_URL!];

  if (process.env.ENABLE_LOCALHOST_CORS) {
    corsWhitelist.push('http://localhost:3000');
    corsWhitelist.push('http://localhost:5000');
  }
  app.enableCors({
    origin: corsWhitelist,
  });

  const options = new DocumentBuilder()
    .setTitle(process.env.NAME!)
    .setVersion('1.0')
    .addTag(process.env.NAME!)
    .addServer(serverUrl)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true, limit: '5mb' }));

  await app.listen(port);
  logger.log(`Application listening on port: ${serverUrl}`);
}
bootstrap();
