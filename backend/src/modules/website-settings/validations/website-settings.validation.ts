import { z } from 'zod';

const websiteSettingsBaseSchema = z
  .object({
    siteName: z
      .string()
      .trim()
      .min(2, 'Site name must contain at least 2 characters.')
      .max(100, 'Site name cannot exceed 100 characters.'),

    siteUrl: z
      .string()
      .trim()
      .url('Please provide a valid site URL.')
      .optional(),

    seoTitle: z
      .string()
      .trim()
      .min(5, 'SEO title must contain at least 5 characters.')
      .max(150, 'SEO title cannot exceed 150 characters.'),

    seoDescription: z
      .string()
      .trim()
      .min(20, 'SEO description must contain at least 20 characters.')
      .max(300, 'SEO description cannot exceed 300 characters.'),

    seoKeywords: z
      .array(
        z
          .string()
          .trim()
          .min(1, 'SEO keyword cannot be empty.')
          .max(50, 'SEO keyword cannot exceed 50 characters.'),
      )
      .optional(),

    ogImage: z
      .string()
      .trim()
      .url('Please provide a valid Open Graph image URL.')
      .optional(),

    contactEmail: z
      .string()
      .trim()
      .email('Please provide a valid contact email.')
      .max(150, 'Contact email cannot exceed 150 characters.'),

    contactPhone: z
      .string()
      .trim()
      .max(30, 'Contact phone cannot exceed 30 characters.')
      .optional(),

    contactLocation: z
      .string()
      .trim()
      .max(150, 'Contact location cannot exceed 150 characters.')
      .optional(),

    heroTitle: z
      .string()
      .trim()
      .min(5, 'Hero title must contain at least 5 characters.')
      .max(150, 'Hero title cannot exceed 150 characters.'),

    heroSubtitle: z
      .string()
      .trim()
      .min(10, 'Hero subtitle must contain at least 10 characters.')
      .max(300, 'Hero subtitle cannot exceed 300 characters.'),

    featuredProjectLimit: z
      .number()
      .int('Featured project limit must be a whole number.')
      .min(0, 'Featured project limit cannot be negative.')
      .optional(),

    featuredSkillLimit: z
      .number()
      .int('Featured skill limit must be a whole number.')
      .min(0, 'Featured skill limit cannot be negative.')
      .optional(),

    allowResumeDownload: z.boolean().optional(),

    maintenanceMode: z.boolean().optional(),
  })
  .strict();

/**
 * Create Website Settings Validation
 */
export const createWebsiteSettingsSchema = websiteSettingsBaseSchema;

/**
 * Update Website Settings Validation
 */
export const updateWebsiteSettingsSchema =
  websiteSettingsBaseSchema.partial();