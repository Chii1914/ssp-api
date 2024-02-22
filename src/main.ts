import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.setGlobalPrefix("api/");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              //Usuario envía cosas que no corresponda
      forbidNonWhitelisted: true,   //No permite enviar cosas que no correspondan
      transform: true,              //Transforma los datos que recibe a los tipos que se le indican
    })
  );

  await app.listen(3000);
}
bootstrap();
