import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './configuration/exceptions/exception.filter';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

async function bootstrap() {
  const appOptions = { cors: true };

  const app = await NestFactory.create(AppModule, appOptions);

  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new AllExceptionsFilter());

  const options = new DocumentBuilder()
    .setTitle('Rhema Rapha API')
    .setDescription('Rhema Rapha API description')
    .setVersion('1.0')
    .addTag('Clinic')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log('Connect at port 3000');
}
bootstrap();
