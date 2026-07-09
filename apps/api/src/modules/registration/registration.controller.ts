import { BadRequestException, Body, Controller, Inject, Post } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { RegistrationDto } from "./dto/registration.dto.js";
import { RegistrationService } from "./registration.service.js";

@Controller("api/register")
export class RegistrationController {
  constructor(
    @Inject(RegistrationService)
    private readonly registrationService: RegistrationService,
  ) {}

  @Post()
  submitRegistration(@Body() payload: RegistrationDto) {
    const dto = plainToInstance(RegistrationDto, payload);
    const validationErrors = validateSync(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (validationErrors.length > 0) {
      throw new BadRequestException(
        validationErrors.map((error) => ({
          property: error.property,
          constraints: error.constraints ?? {},
        })),
      );
    }

    return this.registrationService.submitRegistration(dto);
  }
}
