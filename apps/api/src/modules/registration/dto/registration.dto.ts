import { Type } from "class-transformer";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class RegistrationDto {
  @IsBoolean()
  @IsNotEmpty()
  propertyFound!: boolean;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  deposit!: number;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  propertyPrice!: number;

  @IsBoolean()
  @IsNotEmpty()
  jointApplication!: boolean;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  annualSalary!: number;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
