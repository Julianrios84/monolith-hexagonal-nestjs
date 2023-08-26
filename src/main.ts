import { writeFileSync } from 'fs'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/infrastructure/filters/http.exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { CORS_ORIGIN } from './app.cors-origin';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register());

  /** Filters */
  // app.useGlobalFilters(new AllExceptionFilter());

  /** Global pipes */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );

  /** Cors */
  app.enableCors({
    origin: CORS_ORIGIN,
  });

  /** Swagger */
  const options = new DocumentBuilder()
    .setTitle('Curriculum API - Users')
    .setDescription('Curriculum App')
    .setVersion('2.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  writeFileSync("src/swagger-spec.json", JSON.stringify(document));

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: { filter: true }
  });

  await app.listen(process.env.APP_PORT, () => {
    console.log(
      `${process.env.APP_NAME}: running on: ${process.env.APP_URL}:${process.env.APP_PORT}`,
    );
  });
}
bootstrap();
