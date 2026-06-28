import { env } from './env';

export const appConfig = {
  appName: env.APP_NAME,
  environment: env.NODE_ENV,
  port: env.PORT,
  apiPrefix: env.API_PREFIX,
} as const;