import rateLimit from 'express-rate-limit';

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Too many login attempts, please try again later' },
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
});
