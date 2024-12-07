import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DevLogger } from './logger/dev-logger.service';
import { JsonLogger } from './logger/json-logger.service';
import { TskvLogger } from './logger/tskv-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const env = process.env.NODE_ENVIROMENT || 'development';
  if (env === 'development') {
    app.useLogger(new DevLogger());
  } else if (env === 'production') {
    app.useLogger(new JsonLogger());
  } else if (env === 'custom') {
    app.useLogger(new TskvLogger());
  }

  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
