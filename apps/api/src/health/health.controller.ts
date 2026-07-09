import { Controller, Get } from "@nestjs/common";
import mongoose from "mongoose";

const connectionStateMap: Record<number, string> = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

@Controller("api/health")
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: "ok" as const,
      database: connectionStateMap[mongoose.connection.readyState] ?? "unknown",
    };
  }
}
