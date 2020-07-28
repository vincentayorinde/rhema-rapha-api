import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './configuration/exceptions/exception.filter';

async function bootstrap() {
  const appOptions = { cors: true };

  const app = await NestFactory.create(AppModule, appOptions);

  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new GlobalExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Rhema Rapha API')
    .setDescription('Rhema Rapha API description')
    .setVersion('1.0')
    .addTag('Clinic')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Connect at port 3000');
}
bootstrap();
