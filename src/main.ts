import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { readFileSync } from 'fs';
import { initializeFavs } from './utils/initializeFavs';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiYamlPath = join(__dirname, '../doc', 'api.yaml');
  const apiYaml = readFileSync(apiYamlPath, 'utf8');

  const apiJson = yaml.load(apiYaml) as OpenAPIObject;

  SwaggerModule.setup('api', app, apiJson);

  app.useGlobalPipes(new ValidationPipe());
  await initializeFavs();
  await app.listen(PORT);
}
bootstrap();
