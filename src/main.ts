declare const module: any;

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './application/application.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });



  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup("api", app, document, {
    jsonDocumentUrl: "api/json",
    swaggerUiEnabled: true,
  });

  
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  

  app.useGlobalPipes(new ValidationPipe());

  const appConfig = app.get(ConfigService);
  await app.listen(appConfig.get('port'), () => {
    console.log(`Application is running on: http://localhost:${appConfig.get('port')}`);
  });
}
bootstrap();
