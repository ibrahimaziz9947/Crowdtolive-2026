import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import bcrypt from "bcrypt";
import { Model } from "mongoose";
import type { AppEnvironment } from "../../common/config/env.validation.js";
import { AdminRole, type AdminDocument } from "./schemas/admin.schema.js";
import { Admin } from "./schemas/admin.schema.js";

@Injectable()
export class AdminSeedService {
  private readonly logger = new Logger(AdminSeedService.name);

  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    @Inject(ConfigService)
    private readonly configService: ConfigService<AppEnvironment, true>,
  ) {}

  async ensureSeedAdmin() {
    const existingAdminCount = await this.adminModel.countDocuments().exec();

    if (existingAdminCount > 0) {
      this.logger.log("Admin seed skipped because an administrator already exists.");
      return {
        created: false,
      };
    }

    const email = this.configService.get("ADMIN_SEED_EMAIL", { infer: true }).toLowerCase();
    const password = this.configService.get("ADMIN_SEED_PASSWORD", { infer: true });
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdAdmin = await this.adminModel.create({
      email,
      password: hashedPassword,
      role: AdminRole.SUPER_ADMIN,
    });

    this.logger.log(`Seeded initial admin account for ${createdAdmin.email}.`);

    return {
      created: true,
      email: createdAdmin.email,
      role: createdAdmin.role,
    };
  }
}
