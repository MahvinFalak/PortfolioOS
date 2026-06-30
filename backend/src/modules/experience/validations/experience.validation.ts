import { z } from 'zod';

import {
  EmploymentType,
  LocationType,
} from '../interfaces/experience.interface';

const experienceBaseSchema = z.object({
  company: z
    .string()
    .trim()
    .min(2, 'Company name must contain at least 2 characters.')
    .max(100, 'Company name cannot exceed 100 characters.'),

  position: z
    .string()
    .trim()
    .min(2, 'Position must contain at least 2 characters.')
    .max(100, 'Position cannot exceed 100 characters.'),

  employmentType: z.nativeEnum(EmploymentType, {
    error: 'Please select a valid employment type.',
  }),

  location: z
    .string()
    .trim()
    .min(2, 'Location must contain at least 2 characters.')
    .max(100, 'Location cannot exceed 100 characters.'),

  locationType: z.nativeEnum(LocationType, {
    error: 'Please select a valid location type.',
  }),

  startDate: z.coerce.date({
    error: 'Please provide a valid start date.',
  }),

  endDate: z.coerce
    .date({
      error: 'Please provide a valid end date.',
    })
    .optional(),

  isCurrent: z.boolean().optional(),

  description: z
    .string()
    .trim()
    .max(2000, 'Description cannot exceed 2000 characters.')
    .optional(),

  technologies: z
    .array(
      z
        .string()
        .trim()
        .min(1, 'Technology name cannot be empty.'),
    )
    .optional(),

  displayOrder: z
    .number()
    .int('Display order must be a whole number.')
    .min(0, 'Display order cannot be negative.')
    .optional(),
});

/**
 * Create Experience Validation
 */
export const createExperienceSchema = experienceBaseSchema.superRefine(
  (data, ctx) => {
    if (data.isCurrent && data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date must not be provided for a current job.',
      });
    }

    if (data.isCurrent === false && !data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date is required for previous jobs.',
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
 * Update Experience Validation
 */
export const updateExperienceSchema = experienceBaseSchema
  .partial()
  .superRefine((data, ctx) => {
    if (data.isCurrent && data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date must not be provided for a current job.',
      });
    }

    if (data.isCurrent === false && !data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date is required when marking a job as previous.',
      });
    }

    if (
      data.startDate &&
      data.endDate &&
      data.endDate < data.startDate
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date cannot be earlier than start date.',
      });
    }
  });