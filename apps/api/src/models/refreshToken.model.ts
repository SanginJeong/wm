import { Schema, model, Document, Types } from 'mongoose';

export interface IRefreshToken {
  userId: Types.ObjectId;
  jti: string;
  tokenHash: string;
  expiresAt: Date;
}

export interface IRefreshTokenDocument extends IRefreshToken, Document {}

const refreshTokenSchema = new Schema<IRefreshTokenDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jti: {
    type: String,
    required: true,
    unique: true,
  },
  tokenHash: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default model<IRefreshTokenDocument>('RefreshToken', refreshTokenSchema);
