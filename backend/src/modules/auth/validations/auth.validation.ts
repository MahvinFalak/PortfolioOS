import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please provide a valid email address.'),

  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters.')
    .max(100)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain uppercase, lowercase, number and special character.',
    ),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please provide a valid email address.'),

  password: z
    .string()
    .min(1, 'Password is required.'),
});
/**
 * Refresh Token Validation Schema
 */
// export const refreshTokenSchema = z.object({
//   refreshToken: z
//     .string()
//     .trim()
//     .min(1, 'Refresh token is required.'),
// });
export const refreshTokenSchema = z.object({
  refreshToken: z.string().trim().min(1, {
    message: 'Refresh token is required.',
  }),
});


export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<
  typeof refreshTokenSchema
>;