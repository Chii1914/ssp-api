import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors'; // Importa el paquete 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.setGlobalPrefix("api/");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              //Usuario envía cosas que no corresponda
      forbidNonWhitelisted: true,   //No permite enviar cosas que no correspondan
      transform: true,              //Transforma los datos que recibe a los tipos que se le indican
    })
  );
  await app.listen(process.env.OPERATION_PORT || 3000);
}
bootstrap();
