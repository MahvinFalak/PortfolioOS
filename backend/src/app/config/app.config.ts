import { env } from './env';

export const appConfig = {
  appName: env.APP_NAME,
  environment: env.NODE_ENV,
  port: env.PORT,
  apiPrefix: env.API_PREFIX,
  database: {
    uri: env.MONGODB_URI,
  },
  jwt: {
    secret: env.JWT_SECRET,
    accessTokenExpiry: env.JWT_ACCESS_TOKEN_EXPIRY,
    refreshTokenExpiry: env.JWT_REFRESH_TOKEN_EXPIRY,
  },
} as const;
