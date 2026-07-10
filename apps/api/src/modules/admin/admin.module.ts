import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module.js";
import {
  Registration,
  RegistrationSchema,
} from "../registration/schemas/registration.schema.js";
import { AdminController } from "./admin.controller.js";
import { AdminSeedService } from "./admin-seed.service.js";
import { AdminService } from "./admin.service.js";
import { AdminJwtAuthGuard } from "./guards/admin-jwt-auth.guard.js";
import { Admin, AdminSchema } from "./schemas/admin.schema.js";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Registration.name, schema: RegistrationSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminSeedService, AdminJwtAuthGuard],
  exports: [AdminService, AdminSeedService],
})
export class AdminModule {}
