import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'body-parser'; // Importe o middleware


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json());
  app.enableCors({
    origin:'*',
    methods: 'GET,POST,PATCH,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept'
  })
  await app.listen(3000);
}
bootstrap();
