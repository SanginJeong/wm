import { Router } from 'express';
import { loginRateLimiter } from '../middleware/rateLimiter';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', loginRateLimiter, authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.get('/kakao', authController.kakaoRedirect);
router.get('/kakao/callback', authController.kakaoCallback);
router.get('/google', authController.googleRedirect);
router.get('/google/callback', authController.googleCallback);

export default router;
