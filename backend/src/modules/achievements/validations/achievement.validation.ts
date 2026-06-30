import { z } from 'zod';

const achievementBaseSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(2, 'Achievement title must contain at least 2 characters.')
      .max(150, 'Achievement title cannot exceed 150 characters.'),

    description: z
      .string()
      .trim()
      .min(10, 'Achievement description must contain at least 10 characters.')
      .max(1000, 'Achievement description cannot exceed 1000 characters.'),

    category: z
      .string()
      .trim()
      .min(2, 'Achievement category must contain at least 2 characters.')
      .max(100, 'Achievement category cannot exceed 100 characters.'),

    issuer: z
      .string()
      .trim()
      .max(150, 'Issuer cannot exceed 150 characters.')
      .optional(),

    achievementDate: z.coerce.date({
      error: 'Please provide a valid achievement date.',
    }),

    url: z
      .string()
      .trim()
      .url('Please provide a valid achievement URL.')
      .optional(),

    image: z
      .string()
      .trim()
      .url('Please provide a valid achievement image URL.')
      .optional(),

    featured: z.boolean().optional(),

    displayOrder: z
      .number()
      .int('Display order must be a whole number.')
      .min(0, 'Display order cannot be negative.')
      .optional(),
  })
  .strict();

/**
 * Create Achievement Validation
 */
export const createAchievementSchema = achievementBaseSchema;

/**
 * Update Achievement Validation
 */
export const updateAchievementSchema = achievementBaseSchema.partial();