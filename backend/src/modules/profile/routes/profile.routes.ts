import { Router } from 'express';

import { authenticate } from '../../../app/middlewares/auth.middleware';

import { ProfileController } from '../controllers/profile.controller';

const router = Router();

const profileController =
  new ProfileController();

/**
 * Create Profile
 */
router.post(
  '/',
  authenticate,
  profileController.createProfile,
);

/**
 * Get Profile
 */
router.get(
  '/',
  authenticate,
  profileController.getProfile,
);

/**
 * Update Profile
 */
router.put(
  '/',
  authenticate,
  profileController.updateProfile,
);

export default router;