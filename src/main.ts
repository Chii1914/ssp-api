import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors'; // Importa el paquete 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.use(cors());

  app.setGlobalPrefix("api/");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  await app.listen(3000);
}
bootstrap();