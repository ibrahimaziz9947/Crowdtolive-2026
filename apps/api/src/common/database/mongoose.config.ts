import type { ConfigService } from "@nestjs/config";
import type { MongooseModuleFactoryOptions } from "@nestjs/mongoose";
import type { AppEnvironment } from "../config/env.validation.js";

export function buildMongooseOptions(
  configService: ConfigService<AppEnvironment, true>,
): MongooseModuleFactoryOptions {
  return {
    uri: configService.get("MONGODB_URI", { infer: true }),
    dbName: "crowdtolive",
    autoIndex: false,
    lazyConnection: false,
    minPoolSize: 0,
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 5000,
  };
}
