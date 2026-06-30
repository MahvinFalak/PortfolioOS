import { z } from 'zod';

const certificationBaseSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(2, 'Certification title must contain at least 2 characters.')
      .max(150, 'Certification title cannot exceed 150 characters.'),

    issuer: z
      .string()
      .trim()
      .min(2, 'Issuer must contain at least 2 characters.')
      .max(150, 'Issuer cannot exceed 150 characters.'),

    issueDate: z.coerce.date({
      error: 'Please provide a valid issue date.',
    }),

    expiryDate: z.coerce
      .date({
        error: 'Please provide a valid expiry date.',
      })
      .optional(),

    credentialId: z
      .string()
      .trim()
      .max(150, 'Credential ID cannot exceed 150 characters.')
      .optional(),

    credentialUrl: z
      .string()
      .trim()
      .url('Please provide a valid credential URL.')
      .optional(),

    image: z
      .string()
      .trim()
      .url('Please provide a valid certification image URL.')
      .optional(),

    displayOrder: z
      .number()
      .int('Display order must be a whole number.')
      .min(0, 'Display order cannot be negative.')
      .optional(),
  })
  .strict();

/**
 * Create Certification Validation
 */
export const createCertificationSchema =
  certificationBaseSchema.superRefine((data, ctx) => {
    if (data.expiryDate && data.expiryDate < data.issueDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expiryDate'],
        message: 'Expiry date cannot be earlier than issue date.',
      });
    }
  });

/**
 * Update Certification Validation
 */
export const updateCertificationSchema = certificationBaseSchema
  .partial()
  .superRefine((data, ctx) => {
    if (
      data.issueDate &&
      data.expiryDate &&
      data.expiryDate < data.issueDate
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expiryDate'],
        message: 'Expiry date cannot be earlier than issue date.',
      });
    }
  });