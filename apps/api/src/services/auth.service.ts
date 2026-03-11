import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { Response } from 'express';

import User, { IUserDocument } from '../models/user.model';
import RefreshToken from '../models/refreshToken.model';
import { signAccessToken, signRefreshToken, verifyToken } from '../utils/jwt';
import { hashPassword, comparePassword } from '../utils/hash';

interface TokenPayload {
  id: string;
  role: string;
}

interface RefreshPayload {
  id: string;
  jti: string;
}

interface AuthResult {
  accessToken: string;
  user: {
    id: string;
    email: string | undefined;
    role: string;
  };
}

function setRefreshTokenCookie(res: Response, token: string): void {
  const sameSite = (process.env.COOKIE_SAME_SITE as 'lax' | 'none' | 'strict') ?? 'lax';
  const secure = process.env.NODE_ENV === 'production';
  res.cookie('rt', token, {
    httpOnly: true,
    secure,
    sameSite,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

async function issueTokenPair(
  user: IUserDocument,
  res: Response,
): Promise<{ accessToken: string; rawRT: string }> {
  const jti = crypto.randomUUID();
  const userId = (user._id as { toString(): string }).toString();

  const accessToken = signAccessToken({ id: userId, role: user.role });
  const rawRT = signRefreshToken({ id: userId, jti });

  const tokenHash = await bcrypt.hash(rawRT, 12);

  await RefreshToken.create({
    userId: user._id,
    jti,
    tokenHash,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  setRefreshTokenCookie(res, rawRT);

  return { accessToken, rawRT };
}

export async function signup(
  email: string,
  password: string,
  res: Response,
): Promise<AuthResult> {
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('Email already in use') as Error & { statusCode: number };
    err.statusCode = 409;
    throw err;
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({ email, passwordHash, provider: 'local' });

  const { accessToken } = await issueTokenPair(user, res);

  return {
    accessToken,
    user: { id: (user._id as { toString(): string }).toString(), email: user.email, role: user.role },
  };
}

export async function login(
  email: string,
  password: string,
  res: Response,
): Promise<AuthResult> {
  const user = await User.findOne({ email });

  const unauthorizedErr = (): Error & { statusCode: number } => {
    const err = new Error('Invalid credentials') as Error & { statusCode: number };
    err.statusCode = 401;
    return err;
  };

  if (!user) throw unauthorizedErr();
  if (user.provider !== 'local' || !user.passwordHash) throw unauthorizedErr();

  const match = await comparePassword(password, user.passwordHash);
  if (!match) throw unauthorizedErr();

  const { accessToken } = await issueTokenPair(user, res);

  return {
    accessToken,
    user: { id: (user._id as { toString(): string }).toString(), email: user.email, role: user.role },
  };
}

export async function logout(
  rt: string | undefined,
  res: Response,
): Promise<{ message: string }> {
  if (!rt) {
    res.clearCookie('rt');
    return { message: 'Logged out' };
  }

  try {
    const decoded = verifyToken<RefreshPayload>(rt, process.env.JWT_REFRESH_SECRET ?? '');
    await RefreshToken.deleteOne({ jti: decoded.jti });
  } catch {
    // Token may be expired or invalid — still clear the cookie
  }

  res.clearCookie('rt');
  return { message: 'Logged out' };
}

export async function refresh(
  rt: string,
  res: Response,
): Promise<{ accessToken: string }> {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error('JWT_REFRESH_SECRET is not defined');

  const makeUnauthorized = (): Error & { statusCode: number } => {
    const err = new Error('Invalid refresh token') as Error & { statusCode: number };
    err.statusCode = 401;
    return err;
  };

  let payload: RefreshPayload;
  try {
    payload = verifyToken<RefreshPayload>(rt, secret);
  } catch {
    throw makeUnauthorized();
  }

  const record = await RefreshToken.findOne({ jti: payload.jti });
  if (!record) throw makeUnauthorized();

  const valid = await bcrypt.compare(rt, record.tokenHash);
  if (!valid) throw makeUnauthorized();

  await RefreshToken.deleteOne({ jti: payload.jti });

  const user = await User.findById(record.userId);
  if (!user) throw makeUnauthorized();

  const newJti = crypto.randomUUID();
  const userId = (user._id as { toString(): string }).toString();
  const accessToken = signAccessToken({ id: userId, role: user.role });
  const newRawRT = signRefreshToken({ id: userId, jti: newJti });

  const newTokenHash = await bcrypt.hash(newRawRT, 12);
  await RefreshToken.create({
    userId: user._id,
    jti: newJti,
    tokenHash: newTokenHash,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  setRefreshTokenCookie(res, newRawRT);

  return { accessToken };
}

export async function handleOAuthCallback(
  provider: 'kakao' | 'google',
  providerId: string,
  email: string | undefined,
  res: Response,
): Promise<AuthResult> {
  const user = await User.findOneAndUpdate(
    { provider, providerId },
    { $setOnInsert: { email, provider, providerId, role: 'user', points: 0 } },
    { upsert: true, new: true },
  );

  if (!user) {
    const err = new Error('OAuth user resolution failed') as Error & { statusCode: number };
    err.statusCode = 500;
    throw err;
  }

  const { accessToken } = await issueTokenPair(user, res);

  return {
    accessToken,
    user: { id: (user._id as { toString(): string }).toString(), email: user.email, role: user.role },
  };
}
