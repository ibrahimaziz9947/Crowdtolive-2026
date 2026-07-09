import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import type { RegistrationDto } from "./dto/registration.dto.js";
import { Registration } from "./schemas/registration.schema.js";
import type { RegistrationDocument } from "./schemas/registration.schema.js";

@Injectable()
export class RegistrationService {
  private readonly logger = new Logger(RegistrationService.name);

  constructor(
    @InjectModel(Registration.name)
    private readonly registrationModel: Model<RegistrationDocument>,
  ) {}

  async submitRegistration(payload: RegistrationDto) {
    const created = await this.registrationModel.create({
      ...payload,
    });

    this.logger.log(`Registration stored: ${created._id.toString()}`);

    return {
      message: "Registration payload received successfully.",
      scenario: "registration",
      nextStep: "Frontend can consume this endpoint in the next phase.",
      registrationId: created._id.toString(),
    };
  }
}
