import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { HydratedDocument } from "mongoose";

export enum AdminRole {
  SUPER_ADMIN = "SUPER_ADMIN",
}

@Schema({
  timestamps: true,
  collection: "admins",
})
export class Admin {
  @Prop({
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  })
  email!: string;

  @Prop({
    type: String,
    required: true,
    select: false,
  })
  password!: string;

  @Prop({
    type: String,
    enum: Object.values(AdminRole),
    default: AdminRole.SUPER_ADMIN,
    required: true,
  })
  role!: AdminRole;

  createdAt!: Date;
  updatedAt!: Date;
}

export type AdminDocument = HydratedDocument<Admin>;

export const AdminSchema = SchemaFactory.createForClass(Admin);

AdminSchema.index({ email: 1 }, { unique: true });
