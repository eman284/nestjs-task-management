import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { TransformInterceptor } from "./transform.interceptor";

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  const config = new DocumentBuilder()
    .setTitle("Task Management")
    .setDescription("The task API description")
    .setExternalDoc("/api-json", "/api-json")
    .addServer(`http://localhost:${port}`)
    .setVersion("1.0")
    .addTag("Task")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();
  await app.listen(process.env.PORT || port);
  logger.log(`Application listen in port ${port}`);
}

bootstrap();
