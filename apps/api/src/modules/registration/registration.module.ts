import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RegistrationController } from "./registration.controller.js";
import { RegistrationService } from "./registration.service.js";
import {
  Registration,
  RegistrationSchema,
} from "./schemas/registration.schema.js";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Registration.name,
        schema: RegistrationSchema,
      },
    ]),
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
  exports: [RegistrationService],
})
export class RegistrationModule {}
