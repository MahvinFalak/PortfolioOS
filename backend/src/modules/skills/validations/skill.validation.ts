import { z } from 'zod';

import { SkillCategory } from '../interfaces/skill.interface';

/**
 * Create Skill Validation
 */
export const createSkillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Skill name must contain at least 2 characters.')
    .max(50, 'Skill name cannot exceed 50 characters.'),

  category: z.nativeEnum(SkillCategory, {
    error: 'Please select a valid skill category.',
  }),

  proficiency: z
    .number()
    .int('Proficiency must be a whole number.')
    .min(1, 'Proficiency must be between 1 and 5.')
    .max(5, 'Proficiency must be between 1 and 5.'),

  icon: z
    .string()
    .trim()
    .url('Please provide a valid icon URL.')
    .optional(),

  displayOrder: z
    .number()
    .int('Display order must be a whole number.')
    .min(0, 'Display order cannot be negative.')
    .optional(),
});

/**
 * Update Skill Validation
 */
export const updateSkillSchema =
  createSkillSchema.partial();