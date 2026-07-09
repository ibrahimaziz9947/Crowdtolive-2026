import "reflect-metadata";
import dns from "node:dns";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ExpressAdapter, type NestExpressApplication } from "@nestjs/platform-express";
import type { AppEnvironment } from "./common/config/env.validation.js";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter.js";
import { SuccessResponseInterceptor } from "./common/interceptors/success-response.interceptor.js";
import { AppModule } from "./app.module.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );
  const configService = app.get<ConfigService<AppEnvironment, true>>(ConfigService);

  app.enableCors({
    origin: configService.get("CORS_ORIGIN", { infer: true }),
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new SuccessResponseInterceptor());

  const port = configService.get("PORT", { infer: true });
  await app.listen(port);
}

void bootstrap();
