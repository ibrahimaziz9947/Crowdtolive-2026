import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import type { AppEnvironment } from "../../common/config/env.validation.js";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppEnvironment, true>) => ({
        secret: configService.get("JWT_SECRET", { infer: true }),
        signOptions: {
          expiresIn: configService.get("JWT_EXPIRES_IN", { infer: true }),
        },
      }),
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
