import "reflect-metadata";
import dns from "node:dns";
import type { Handler } from "aws-lambda";
import { configure as serverlessExpress } from "@vendia/serverless-express";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ExpressAdapter, type NestExpressApplication } from "@nestjs/platform-express";
import type { AppEnvironment } from "./common/config/env.validation.js";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter.js";
import { SuccessResponseInterceptor } from "./common/interceptors/success-response.interceptor.js";
import { AppModule } from "./app.module.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

let cachedApp: NestExpressApplication | null = null;
let cachedServer: Handler | null = null;

async function configureApp(app: NestExpressApplication) {
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

async function getServer() {
  if (cachedServer) {
    return cachedServer;
  }

  const app = await createApp();
  const expressApp = app.getHttpAdapter().getInstance();

  cachedServer = serverlessExpress({
    app: expressApp,
  }) as Handler;

  return cachedServer;
}

export const handler: Handler = async (event, context, callback) => {
  const server = await getServer();
  return server(event, context, callback);
};
