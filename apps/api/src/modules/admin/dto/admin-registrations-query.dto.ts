import { Transform, Type } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
import { RegistrationStatus } from "../../registration/schemas/registration.schema.js";

export class AdminRegistrationsQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  limit = 10;

  @Transform(({ value }) => (typeof value === "string" ? value.trim() : ""))
  @IsString()
  @IsOptional()
  search = "";

  @Transform(({ value }) => (typeof value === "string" ? value.trim() : undefined))
  @IsEnum(RegistrationStatus)
  @IsOptional()
  status?: RegistrationStatus;
}
