import { Injectable, Logger } from "@nestjs/common";
import type { OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import mongoose from "mongoose";
import { validateEnvironment } from "../config/env.validation.js";

@Injectable()
export class MongoConnectionService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(MongoConnectionService.name);

  async onApplicationBootstrap() {
    const env = validateEnvironment(process.env);

    try {
      await mongoose.connect(env.MONGODB_URI, {
        dbName: "crowdtolive",
        autoIndex: false,
        serverSelectionTimeoutMS: 5000,
      });

      this.logger.log("MongoDB connection established.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown MongoDB error";

      this.logger.warn(`MongoDB connection unavailable at startup: ${message}`);
    }
  }

  async onApplicationShutdown() {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}
