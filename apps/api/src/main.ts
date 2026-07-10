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

if (process.env.NODE_ENV === "development" && process.env.VERCEL !== "1") {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

let cachedApp: NestExpressApplication | null = null;

async function configureApp(app: NestExpressApplication) {
  const configService = app.get<ConfigService<AppEnvironment, true>>(ConfigService);
  const nodeEnv = configService.get("NODE_ENV", { infer: true });
  const corsOriginRaw = configService.get("CORS_ORIGIN", { infer: true });
  const allowedOrigins = corsOriginRaw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      if (nodeEnv === "development") {
        try {
          const url = new URL(origin);
          const isLocalhost =
            url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "::1";
          if (isLocalhost) {
            callback(null, true);
            return;
          }
        } catch {
          callback(null, false);
          return;
        }
      }

      callback(null, false);
    },
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
}

export async function createApp() {
  if (cachedApp) {
    return cachedApp;
  }

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  await configureApp(app);
  await app.init();

  cachedApp = app;

  return app;
}
