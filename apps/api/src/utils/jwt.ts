import jwt from 'jsonwebtoken';

export function signAccessToken(payload: { id: string; role: string }): string {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw new Error('JWT_ACCESS_SECRET is not defined');
  return jwt.sign(payload, secret, { expiresIn: '15m' });
}

export function signRefreshToken(payload: { id: string; jti: string }): string {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error('JWT_REFRESH_SECRET is not defined');
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function verifyToken<T>(token: string, secret: string): T {
  return jwt.verify(token, secret) as T;
}
