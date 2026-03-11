import jwt, { type JwtPayload } from 'jsonwebtoken';

function isObjectPayload(value: string | JwtPayload): value is JwtPayload {
  return typeof value !== 'string';
}

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

export function verifyAccessToken(token: string, secret: string): { id: string; role: string } {
  const decoded = jwt.verify(token, secret);
  if (
    !isObjectPayload(decoded) ||
    typeof decoded['id'] !== 'string' ||
    typeof decoded['role'] !== 'string'
  ) {
    throw new Error('Invalid access token payload');
  }
  return { id: decoded['id'], role: decoded['role'] };
}

export function verifyRefreshToken(token: string, secret: string): { id: string; jti: string } {
  const decoded = jwt.verify(token, secret);
  if (
    !isObjectPayload(decoded) ||
    typeof decoded['id'] !== 'string' ||
    typeof decoded['jti'] !== 'string'
  ) {
    throw new Error('Invalid refresh token payload');
  }
  return { id: decoded['id'], jti: decoded['jti'] };
}
