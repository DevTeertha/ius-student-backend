import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('IUS Student API')
    .setDescription('IUS Student API')
    .setVersion('1.0')
    .addTag('IUS Student')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  await app.listen(8081);
}
bootstrap();
