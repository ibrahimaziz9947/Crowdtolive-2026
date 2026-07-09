import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./common/database/database.module.js";
import { validateEnvironment } from "./common/config/env.validation.js";
import { HealthModule } from "./health/health.module.js";
import { AdminModule } from "./modules/admin/admin.module.js";
import { AuthModule } from "./modules/auth/auth.module.js";
import { DocumentsModule } from "./modules/documents/documents.module.js";
import { PropertiesModule } from "./modules/properties/properties.module.js";
import { RegistrationModule } from "./modules/registration/registration.module.js";
import { UsersModule } from "./modules/users/users.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [".env.local", ".env"],
      validate: validateEnvironment,
    }),
    DatabaseModule,
    HealthModule,
    AuthModule,
    RegistrationModule,
    UsersModule,
    PropertiesModule,
    DocumentsModule,
    AdminModule,
  ],
})
export class AppModule {}
