import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Unauthorized' });
    return;
  }

  const token = authHeader.slice(7);

  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    next(new Error('JWT_ACCESS_SECRET is not defined'));
    return;
  }

  try {
    const payload = verifyAccessToken(token, secret);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Unauthorized' });
  }
}
