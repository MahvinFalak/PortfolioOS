import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().positive(),
  APP_NAME: z.string().min(1),
  API_PREFIX: z.string().min(1),
  MONGODB_URI: z.string().min(1),
    JWT_SECRET: z.string().min(1),

  JWT_ACCESS_TOKEN_EXPIRY: z.string().default('15m'),

  JWT_REFRESH_TOKEN_EXPIRY: z.string().default('7d'),
});

export const env = envSchema.parse(process.env);