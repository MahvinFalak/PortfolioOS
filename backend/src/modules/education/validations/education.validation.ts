import { z } from 'zod';

const educationBaseSchema = z
  .object({
    institution: z
      .string()
      .trim()
      .min(2, 'Institution must contain at least 2 characters.')
      .max(150, 'Institution cannot exceed 150 characters.'),

    degree: z
      .string()
      .trim()
      .min(2, 'Degree must contain at least 2 characters.')
      .max(150, 'Degree cannot exceed 150 characters.'),

    fieldOfStudy: z
      .string()
      .trim()
      .min(2, 'Field of study must contain at least 2 characters.')
      .max(150, 'Field of study cannot exceed 150 characters.'),

    location: z
      .string()
      .trim()
      .max(150, 'Location cannot exceed 150 characters.')
      .optional(),

    startDate: z.coerce.date({
      error: 'Please provide a valid start date.',
    }),

    endDate: z.coerce
      .date({
        error: 'Please provide a valid end date.',
      })
      .optional(),

    currentlyStudying: z.boolean().optional(),

    grade: z
      .string()
      .trim()
      .max(50, 'Grade cannot exceed 50 characters.')
      .optional(),

    description: z
      .string()
      .trim()
      .max(1000, 'Description cannot exceed 1000 characters.')
      .optional(),

    achievements: z
      .array(
        z
          .string()
          .trim()
          .min(1, 'Achievement cannot be empty.')
          .max(300, 'Achievement cannot exceed 300 characters.'),
      )
      .optional(),

    displayOrder: z
      .number()
      .int('Display order must be a whole number.')
      .min(0, 'Display order cannot be negative.')
      .optional(),
  })
  .strict();

/**
 * Create Education Validation
 */
export const createEducationSchema = educationBaseSchema.superRefine(
  (data, ctx) => {
    if (!data.currentlyStudying && !data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date is required when currently studying is false.',
      });
    }

    if (data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date cannot be earlier than start date.',
      });
    }
  },
);

/**
 * Update Education Validation
 */
export const updateEducationSchema = educationBaseSchema
  .partial()
  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date cannot be earlier than start date.',
      });
    }
  });