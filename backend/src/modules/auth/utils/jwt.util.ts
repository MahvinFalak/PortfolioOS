import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { appConfig } from '../../../app/config';

const JWT_SECRET = appConfig.jwt.secret;

const ACCESS_TOKEN_EXPIRY = appConfig.jwt
  .accessTokenExpiry as SignOptions['expiresIn'];

const REFRESH_TOKEN_EXPIRY = appConfig.jwt
  .refreshTokenExpiry as SignOptions['expiresIn'];

export interface AuthTokenPayload extends JwtPayload {
  userId: string;
  role?: string;
}

/**
 * Generate JWT Access Token.
 */
export const generateAccessToken = (userId: string, role: string): string => {
  return jwt.sign(
    {
      userId,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    },
  );
};

/**
 * Generate JWT Refresh Token.
 */
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    {
      userId,
    },
    JWT_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    },
  );
};

/**
 * Verify JWT Token.
 */
export const verifyToken = (token: string): AuthTokenPayload => {
  return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
};
