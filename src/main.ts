import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './config'; // Import the config

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mini app API')
    .setDescription('Api for Mini App')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(config.server.port); // Use the port from the config
}
bootstrap();