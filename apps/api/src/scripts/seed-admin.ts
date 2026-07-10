import "reflect-metadata";
import dns from "node:dns";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module.js";
import { AdminSeedService } from "../modules/admin/admin-seed.service.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function seedAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ["log", "error", "warn"],
  });

  try {
    const adminSeedService = app.get(AdminSeedService);
    const result = await adminSeedService.ensureSeedAdmin();

    if (result.created) {
      console.log(`Seeded administrator: ${result.email}`);
    } else {
      console.log("Seeded administrator already exists. No changes made.");
    }
  } finally {
    await app.close();
  }
}

void seedAdmin();
