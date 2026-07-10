import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import bcrypt from "bcrypt";
import { Model, Types } from "mongoose";
import type { AppEnvironment } from "../../common/config/env.validation.js";
import type { AdminRegistrationsQueryDto } from "./dto/admin-registrations-query.dto.js";
import type { AdminLoginDto } from "./dto/admin-login.dto.js";
import type { UpdateRegistrationStatusDto } from "./dto/update-registration-status.dto.js";
import { AdminRole, type AdminDocument } from "./schemas/admin.schema.js";
import { Admin } from "./schemas/admin.schema.js";
import {
  Registration,
  RegistrationStatus,
  type RegistrationDocument,
} from "../registration/schemas/registration.schema.js";

export interface AdminJwtPayload {
  sub: string;
  email: string;
  role: AdminRole;
}

function mapRegistration(record: RegistrationDocument) {
  return {
    registrationId: record._id.toString(),
    propertyFound: record.propertyFound,
    deposit: record.deposit,
    city: record.city,
    propertyPrice: record.propertyPrice,
    jointApplication: record.jointApplication,
    annualSalary: record.annualSalary,
    email: record.email,
    status: record.status,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    @InjectModel(Registration.name)
    private readonly registrationModel: Model<RegistrationDocument>,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(ConfigService)
    private readonly configService: ConfigService<AppEnvironment, true>,
  ) {}

  async login(payload: AdminLoginDto) {
    const normalizedEmail = payload.email.trim().toLowerCase();
    const admin = await this.adminModel
      .findOne({ email: normalizedEmail })
      .select("+password")
      .exec();

    if (!admin) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(payload.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    const tokenPayload: AdminJwtPayload = {
      sub: admin.id,
      email: admin.email,
      role: admin.role,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken,
      expiresIn: this.configService.get("JWT_EXPIRES_IN", { infer: true }),
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    };
  }

  async clearAuthCookie() {
    return {
      message: "Logged out successfully.",
    };
  }

  async getRegistrations(query: AdminRegistrationsQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const search = typeof query.search === "string" ? query.search.trim() : "";
    const filter: {
      status?: RegistrationStatus;
      $or?: Array<Record<string, unknown>>;
    } = {};

    if (query.status) {
      filter.status = query.status;
    }

    if (search) {
      const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { email: { $regex: safeSearch, $options: "i" } },
        { city: { $regex: safeSearch, $options: "i" } },
      ];
    }

    const [items, totalItems, statusCounts] = await Promise.all([
      this.registrationModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.registrationModel.countDocuments(filter).exec(),
      this.registrationModel.aggregate<{
        _id: RegistrationStatus;
        count: number;
      }>([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalItems / limit));
    const statistics = {
      total: 0,
      notQualified: 0,
      qualified: 0,
      pending: 0,
    };

    for (const entry of statusCounts) {
      statistics.total += entry.count;

      if (entry._id === RegistrationStatus.NOT_QUALIFIED) {
        statistics.notQualified = entry.count;
      }

      if (entry._id === RegistrationStatus.QUALIFIED) {
        statistics.qualified = entry.count;
      }

      if (entry._id === RegistrationStatus.PENDING) {
        statistics.pending = entry.count;
      }
    }

    return {
      items: items.map(mapRegistration),
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
      filters: {
        search,
        status: query.status ?? null,
      },
      statistics,
    };
  }

  async getRegistrationById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Registration not found.");
    }

    const registration = await this.registrationModel.findById(id).exec();

    if (!registration) {
      throw new NotFoundException("Registration not found.");
    }

    return mapRegistration(registration);
  }

  async updateRegistrationStatus(id: string, payload: UpdateRegistrationStatusDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Registration not found.");
    }

    const registration = await this.registrationModel
      .findByIdAndUpdate(
        id,
        { status: payload.status },
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();

    if (!registration) {
      throw new NotFoundException("Registration not found.");
    }

    return {
      message: "Registration status updated successfully.",
      registration: mapRegistration(registration),
    };
  }
}
