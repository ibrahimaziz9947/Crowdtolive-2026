import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Query,
  Inject,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Response } from "express";
import type { AppEnvironment } from "../../common/config/env.validation.js";
import { AdminRegistrationsQueryDto } from "./dto/admin-registrations-query.dto.js";
import { AdminLoginDto } from "./dto/admin-login.dto.js";
import { UpdateRegistrationStatusDto } from "./dto/update-registration-status.dto.js";
import { AdminJwtAuthGuard } from "./guards/admin-jwt-auth.guard.js";
import { AdminService } from "./admin.service.js";

@Controller("api/admin")
export class AdminController {
  constructor(
    @Inject(AdminService)
    private readonly adminService: AdminService,
    @Inject(ConfigService)
    private readonly configService: ConfigService<AppEnvironment, true>,
  ) {}

  @Post("login")
  @HttpCode(200)
  async login(
    @Body() payload: AdminLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.adminService.login(payload);

    response.cookie(
      this.configService.get("ADMIN_AUTH_COOKIE_NAME", { infer: true }),
      result.accessToken,
      {
        httpOnly: true,
        sameSite: "lax",
        secure: this.configService.get("NODE_ENV", { infer: true }) === "production",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      },
    );

    return result;
  }

  @Post("logout")
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(
      this.configService.get("ADMIN_AUTH_COOKIE_NAME", { infer: true }),
      {
        httpOnly: true,
        sameSite: "lax",
        secure: this.configService.get("NODE_ENV", { infer: true }) === "production",
        path: "/",
      },
    );

    return this.adminService.clearAuthCookie();
  }

  @Get("registrations")
  @UseGuards(AdminJwtAuthGuard)
  async getRegistrations(@Query() query: AdminRegistrationsQueryDto) {
    return this.adminService.getRegistrations(query);
  }

  @Get("registrations/:id")
  @UseGuards(AdminJwtAuthGuard)
  async getRegistrationById(@Param("id") id: string) {
    return this.adminService.getRegistrationById(id);
  }

  @Patch("registrations/:id/status")
  @UseGuards(AdminJwtAuthGuard)
  async updateRegistrationStatus(
    @Param("id") id: string,
    @Body() payload: UpdateRegistrationStatusDto,
  ) {
    return this.adminService.updateRegistrationStatus(id, payload);
  }
}
