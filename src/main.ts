import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global para DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Config básica de Swagger
  const config = new DocumentBuilder()
    .setTitle('My First Project – API')
    .setDescription('NestJS + Prisma demo')
    .setVersion('1.0.0')
    .addTag('users') // etiqueta para el módulo Users
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // UI en /api

  await app.listen(3000);
}
bootstrap();
