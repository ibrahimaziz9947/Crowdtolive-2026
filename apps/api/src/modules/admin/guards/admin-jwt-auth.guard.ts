import {
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import type { Request } from "express";
import type { AppEnvironment } from "../../../common/config/env.validation.js";
import type { AdminJwtPayload } from "../admin.service.js";

interface AdminAuthenticatedRequest extends Request {
  admin?: AdminJwtPayload;
}

function getCookieValue(rawCookieHeader: string | undefined, name: string) {
  if (!rawCookieHeader) return "";

  const parts = rawCookieHeader.split(";");

  for (const part of parts) {
    const [cookieName, ...valueParts] = part.trim().split("=");
    if (cookieName === name) {
      return decodeURIComponent(valueParts.join("="));
    }
  }

  return "";
}

@Injectable()
export class AdminJwtAuthGuard implements CanActivate {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(ConfigService)
    private readonly configService: ConfigService<AppEnvironment, true>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AdminAuthenticatedRequest>();
    const authorizationHeader = request.headers.authorization ?? "";
    const bearerToken = authorizationHeader.startsWith("Bearer ")
      ? authorizationHeader.slice("Bearer ".length)
      : "";
    const cookieToken = getCookieValue(
      request.headers.cookie,
      this.configService.get("ADMIN_AUTH_COOKIE_NAME", { infer: true }),
    );
    const token = bearerToken || cookieToken;

    if (!token) {
      throw new UnauthorizedException("Authentication is required.");
    }

    try {
      const payload = await this.jwtService.verifyAsync<AdminJwtPayload>(token, {
        secret: this.configService.get("JWT_SECRET", { infer: true }),
      });

      request.admin = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired authentication token.");
    }
  }
}
