import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import type { AppEnvironment } from "../config/env.validation.js";
import { buildMongooseOptions } from "./mongoose.config.js";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppEnvironment, true>) =>
        buildMongooseOptions(configService),
    }),
  ],
})
export class DatabaseModule {}
