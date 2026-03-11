import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const data = await authService.signup(email, password, res);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const data = await authService.login(email, password, res);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const rt = req.cookies['rt'] as string | undefined;
    const data = await authService.logout(rt, res);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const rt = req.cookies['rt'] as string | undefined;
    if (!rt) {
      res.status(401).json({ success: false, error: 'No refresh token' });
      return;
    }
    const data = await authService.refresh(rt, res);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export function kakaoRedirect(_req: Request, res: Response, next: NextFunction): void {
  try {
    const clientId = process.env.KAKAO_CLIENT_ID;
    const redirectUri = process.env.KAKAO_REDIRECT_URI;
    if (!clientId || !redirectUri) {
      res.status(500).json({ success: false, error: 'Kakao OAuth not configured' });
      return;
    }
    const url =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${encodeURIComponent(clientId)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code`;
    res.redirect(url);
  } catch (err) {
    next(err);
  }
}

export async function kakaoCallback(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const code = req.query['code'] as string | undefined;
    if (!code) {
      res.status(400).json({ success: false, error: 'Missing authorization code' });
      return;
    }

    const clientId = process.env.KAKAO_CLIENT_ID ?? '';
    const clientSecret = process.env.KAKAO_CLIENT_SECRET ?? '';
    const redirectUri = process.env.KAKAO_REDIRECT_URI ?? '';

    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code,
      }),
    });

    const tokenData = (await tokenRes.json()) as { access_token?: string; error?: string };
    if (!tokenData.access_token) {
      res.status(401).json({ success: false, error: 'Failed to obtain Kakao access token' });
      return;
    }

    const profileRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profileData = (await profileRes.json()) as {
      id?: number;
      kakao_account?: { email?: string };
    };

    if (!profileData.id) {
      res.status(401).json({ success: false, error: 'Failed to obtain Kakao profile' });
      return;
    }

    const providerId = String(profileData.id);
    const email = profileData.kakao_account?.email;

    const data = await authService.handleOAuthCallback('kakao', providerId, email, res);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export function googleRedirect(_req: Request, res: Response, next: NextFunction): void {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;
    if (!clientId || !redirectUri) {
      res.status(500).json({ success: false, error: 'Google OAuth not configured' });
      return;
    }
    const url =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${encodeURIComponent(clientId)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent('email profile')}`;
    res.redirect(url);
  } catch (err) {
    next(err);
  }
}

export async function googleCallback(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const code = req.query['code'] as string | undefined;
    if (!code) {
      res.status(400).json({ success: false, error: 'Missing authorization code' });
      return;
    }

    const clientId = process.env.GOOGLE_CLIENT_ID ?? '';
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? '';
    const redirectUri = process.env.GOOGLE_REDIRECT_URI ?? '';

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code,
      }),
    });

    const tokenData = (await tokenRes.json()) as {
      id_token?: string;
      access_token?: string;
      error?: string;
    };

    if (!tokenData.id_token) {
      res.status(401).json({ success: false, error: 'Failed to obtain Google id_token' });
      return;
    }

    // Decode the JWT id_token payload without verification (signature verified by Google's endpoint)
    const [, payloadB64] = tokenData.id_token.split('.');
    const payloadJson = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const idTokenPayload = JSON.parse(payloadJson) as { sub?: string; email?: string };

    if (!idTokenPayload.sub) {
      res.status(401).json({ success: false, error: 'Failed to decode Google id_token' });
      return;
    }

    const providerId = idTokenPayload.sub;
    const email = idTokenPayload.email;

    const data = await authService.handleOAuthCallback('google', providerId, email, res);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
