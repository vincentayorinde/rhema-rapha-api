import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './configuration/exceptions/exception.filter';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';

dotenv.config();

const port = process.env.PORT;

async function bootstrap() {
  const appOptions = { cors: true };

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    appOptions,
  );

  app.enableCors();
  app.setViewEngine('ejs');
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

  await app.listen(process.env.PORT || 3000);
  console.log(`Connect at port ${port}`);
}
bootstrap();
