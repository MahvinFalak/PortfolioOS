import { Router } from 'express';

import { authenticate } from '../../../app/middlewares/auth.middleware';

import { ExperienceController } from '../controllers/experience.controller';

const router = Router();

const experienceController =
  new ExperienceController();

/**
 * Create Experience
 */
router.post(
  '/',
  authenticate,
  experienceController.createExperience,
);

/**
 * Get All Experiences
 */
router.get(
  '/',
  authenticate,
  experienceController.getExperiences,
);

/**
 * Get Experience By ID
 */
router.get(
  '/:id',
  authenticate,
  experienceController.getExperienceById,
);

/**
 * Update Experience
 */
router.put(
  '/:id',
  authenticate,
  experienceController.updateExperience,
);

/**
 * Delete Experience
 */
router.delete(
  '/:id',
  authenticate,
  experienceController.deleteExperience,
);

export default router;