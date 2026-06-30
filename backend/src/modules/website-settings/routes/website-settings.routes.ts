import { Router } from 'express';

import { authenticate } from '../../../app/middlewares/auth.middleware';

import { WebsiteSettingsController } from '../controllers/website-settings.controller';

const router = Router();

const websiteSettingsController = new WebsiteSettingsController();

/**
 * Create Website Settings
 */
router.post(
  '/',
  authenticate,
  websiteSettingsController.createWebsiteSettings,
);

/**
 * Get Website Settings
 */
router.get('/', authenticate, websiteSettingsController.getWebsiteSettings);

/**
 * Update Website Settings
 */
router.put(
  '/',
  authenticate,
  websiteSettingsController.updateWebsiteSettings,
);

export default router;