import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { HydratedDocument } from "mongoose";

export enum RegistrationStatus {
  NOT_QUALIFIED = "NOT_QUALIFIED",
}

@Schema({
  timestamps: true,
  collection: "registrations",
})
export class Registration {
  @Prop({ type: Boolean, required: true })
  propertyFound!: boolean;

  @Prop({ type: Number, required: true })
  deposit!: number;

  @Prop({ type: String, required: true })
  city!: string;

  @Prop({ type: Number, required: true })
  propertyPrice!: number;

  @Prop({ type: Boolean, required: true })
  jointApplication!: boolean;

  @Prop({ type: Number, required: true })
  annualSalary!: number;

  @Prop({ type: String, required: true })
  email!: string;

  @Prop({
    type: String,
    enum: Object.values(RegistrationStatus),
    default: RegistrationStatus.NOT_QUALIFIED,
    required: true,
  })
  status!: RegistrationStatus;

  createdAt!: Date;
  updatedAt!: Date;
}

export type RegistrationDocument = HydratedDocument<Registration>;

export const RegistrationSchema = SchemaFactory.createForClass(Registration);

