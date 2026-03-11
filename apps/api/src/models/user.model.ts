import { Schema, model, Document } from 'mongoose';

export interface IUser {
  email?: string;
  passwordHash?: string;
  provider: 'local' | 'kakao' | 'google';
  providerId?: string;
  role: 'user' | 'admin';
  points: number;
}

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      sparse: true,
      unique: true,
    },
    passwordHash: {
      type: String,
    },
    provider: {
      type: String,
      enum: ['local', 'kakao', 'google'],
      required: true,
    },
    providerId: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

userSchema.index({ provider: 1, providerId: 1 }, { unique: true, sparse: true });

export default model<IUserDocument>('User', userSchema);
