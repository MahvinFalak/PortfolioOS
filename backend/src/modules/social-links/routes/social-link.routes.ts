import { Router } from 'express';

import { authenticate } from '../../../app/middlewares/auth.middleware';

import { SocialLinkController } from '../controllers/social-link.controller';

const router = Router();

const socialLinkController = new SocialLinkController();

/**
 * Create Social Link
 */
router.post('/', authenticate, socialLinkController.createSocialLink);

/**
 * Get All Social Links
 */
router.get('/', authenticate, socialLinkController.getSocialLinks);

/**
 * Get Social Link By ID
 */
router.get('/:id', authenticate, socialLinkController.getSocialLinkById);

/**
 * Update Social Link
 */
router.put('/:id', authenticate, socialLinkController.updateSocialLink);

/**
 * Delete Social Link
 */
router.delete('/:id', authenticate, socialLinkController.deleteSocialLink);

export default router;