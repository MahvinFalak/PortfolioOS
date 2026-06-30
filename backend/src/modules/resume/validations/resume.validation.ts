import { z } from 'zod';

/**
 * Create Resume Validation
 */
export const createResumeSchema = z
  .object({
    version: z
      .string()
      .trim()
      .min(1, 'Resume version is required.')
      .max(50, 'Resume version cannot exceed 50 characters.'),

    fileName: z
      .string()
      .trim()
      .min(1, 'File name is required.')
      .max(255, 'File name cannot exceed 255 characters.'),

    fileUrl: z
      .string()
      .trim()
      .url('Please provide a valid resume file URL.'),

    fileSize: z
      .number()
      .int('File size must be a whole number.')
      .min(1, 'File size must be greater than 0.'),

    uploadedAt: z.coerce
      .date({
        error: 'Please provide a valid upload date.',
      })
      .optional(),

    active: z.boolean().optional(),
  })
  .strict();

/**
 * Update Resume Validation
 */
export const updateResumeSchema = createResumeSchema.partial();