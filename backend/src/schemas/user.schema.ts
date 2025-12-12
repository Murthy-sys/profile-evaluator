import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  USER = 'user',
  HR = 'hr',
  PAYROLL = 'payroll',
}

export enum EmployeeStatus {
  PENDING = 'pending',
  PROBATION = 'probation',
  PERMANENT = 'permanent',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop()
  address: string;

  @Prop()
  education: string;

  @Prop()
  experience: string;

  @Prop()
  skills: string[];

  @Prop()
  referredBy: string;

  @Prop()
  referralCode: string;

  @Prop()
  resumePath: string;

  @Prop()
  resumeScore: number;

  @Prop()
  keySkills: string[];

  @Prop({ enum: EmployeeStatus, default: EmployeeStatus.PENDING })
  employeeStatus: EmployeeStatus;

  @Prop()
  joiningDate: Date;

  @Prop()
  probationEndDate: Date;

  @Prop({ default: false })
  referralPaid: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
