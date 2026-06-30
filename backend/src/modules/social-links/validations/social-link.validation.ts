import { z } from 'zod';

const socialLinkBaseSchema = z
  .object({
    platform: z
      .string()
      .trim()
      .min(2, 'Platform must contain at least 2 characters.')
      .max(50, 'Platform cannot exceed 50 characters.'),

    username: z
      .string()
      .trim()
      .min(1, 'Username is required.')
      .max(100, 'Username cannot exceed 100 characters.'),

    url: z
      .string()
      .trim()
      .url('Please provide a valid social link URL.'),

    icon: z
      .string()
      .trim()
      .min(1, 'Icon is required.')
      .max(100, 'Icon cannot exceed 100 characters.'),

    displayOrder: z
      .number()
      .int('Display order must be a whole number.')
      .min(0, 'Display order cannot be negative.')
      .optional(),

    visible: z.boolean().optional(),
  })
  .strict();

/**
 * Create Social Link Validation
 */
export const createSocialLinkSchema = socialLinkBaseSchema;

/**
 * Update Social Link Validation
 */
export const updateSocialLinkSchema = socialLinkBaseSchema.partial();