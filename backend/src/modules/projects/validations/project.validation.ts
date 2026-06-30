import { z } from 'zod';

const objectIdSchema = z
  .string()
  .trim()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid technology ID.');

const urlSchema = z.string().trim().url('Invalid URL.');

const textArraySchema = z
  .array(z.string().trim().min(1, 'Value cannot be empty.'))
  .min(1, 'At least one value is required.');

export const createProjectSchema = z
  .object({
    title: z.string().trim().min(2).max(150),
    slug: z
      .string()
      .trim()
      .toLowerCase()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Slug must be lowercase and URL-safe.',
      ),
    shortDescription: z.string().trim().min(20).max(300),
    detailedDescription: z.string().trim().min(20).max(5000),
    projectType: z.string().trim().min(2).max(100),
    featured: z.boolean(),
    technologies: z
      .array(objectIdSchema)
      .min(1, 'At least one technology is required.'),
    images: z
      .array(urlSchema)
      .min(1, 'At least one project image is required.'),
    thumbnail: urlSchema,
    githubUrl: urlSchema.optional(),
    liveDemoUrl: urlSchema.optional(),
    architectureDiagram: urlSchema.optional(),
    challenges: textArraySchema,
    solutions: textArraySchema,
    lessonsLearned: textArraySchema,
    displayOrder: z.number().int().min(0),
  })
  .strict();

export const updateProjectSchema = createProjectSchema.partial();