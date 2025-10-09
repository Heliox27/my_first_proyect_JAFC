import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,   // elimina propiedades no declaradas en DTOs
      transform: true,   // convierte tipos (string->number, etc.)
    }),
  );

  // (Opcional) habilitar CORS si lo necesitas
  // app.enableCors();

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('My First Project – API')
    .setDescription('NestJS + Prisma demo')
    .setVersion('1.0.0')
    .addTag('users')
    .addTag('auth')
    .addBearerAuth() // <-- agrega soporte para Authorization: Bearer <token>
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // UI en http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();
