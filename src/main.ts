import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors();
  
  const port = process.env.PORT || 3090;

  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
