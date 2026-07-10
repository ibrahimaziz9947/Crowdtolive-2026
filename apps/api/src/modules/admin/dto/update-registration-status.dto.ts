import { IsEnum } from "class-validator";
import { RegistrationStatus } from "../../registration/schemas/registration.schema.js";

export class UpdateRegistrationStatusDto {
  @IsEnum(RegistrationStatus)
  status!: RegistrationStatus;
}
