import { z } from 'zod';

/**
 * Social Links
 */
const socialLinksSchema = z
  .object({
    github: z
      .string()
      .trim()
      .url('Please provide a valid GitHub URL.')
      .optional(),

    linkedin: z
      .string()
      .trim()
      .url('Please provide a valid LinkedIn URL.')
      .optional(),

    twitter: z
      .string()
      .trim()
      .url('Please provide a valid Twitter URL.')
      .optional(),

    website: z
      .string()
      .trim()
      .url('Please provide a valid website URL.')
      .optional(),
  })
  .strict();

/**
 * Create Profile
 */
export const createProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'First name must contain at least 2 characters.')
    .max(50, 'First name cannot exceed 50 characters.'),

  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must contain at least 2 characters.')
    .max(50, 'Last name cannot exceed 50 characters.'),

  headline: z
    .string()
    .trim()
    .max(150, 'Headline cannot exceed 150 characters.')
    .optional(),

  about: z
    .string()
    .trim()
    .max(1000, 'About section cannot exceed 1000 characters.')
    .optional(),

  profileImage: z
    .string()
    .trim()
    .url('Please provide a valid profile image URL.')
    .optional(),

  resumeUrl: z
    .string()
    .trim()
    .url('Please provide a valid resume URL.')
    .optional(),

  phone: z
    .string()
    .trim()
    .max(20, 'Phone number cannot exceed 20 characters.')
    .optional(),

  location: z
    .string()
    .trim()
    .max(100, 'Location cannot exceed 100 characters.')
    .optional(),

  socialLinks: socialLinksSchema.optional(),
});

/**
 * Update Profile
 */
export const updateProfileSchema =
  createProfileSchema.partial();