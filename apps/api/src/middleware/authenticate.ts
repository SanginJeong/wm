import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

interface AccessTokenPayload {
  id: string;
  role: string;
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Unauthorized' });
    return;
  }

  const token = authHeader.slice(7);

  try {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) throw new Error('JWT_ACCESS_SECRET is not defined');

    const payload = verifyToken<AccessTokenPayload>(token, secret);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Unauthorized' });
  }
}
