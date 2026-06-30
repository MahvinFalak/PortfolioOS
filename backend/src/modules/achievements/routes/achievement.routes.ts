import { Router } from 'express';

import { authenticate } from '../../../app/middlewares/auth.middleware';

import { AchievementController } from '../controllers/achievement.controller';

const router = Router();

const achievementController = new AchievementController();

/**
 * Create Achievement
 */
router.post('/', authenticate, achievementController.createAchievement);

/**
 * Get All Achievements
 */
router.get('/', authenticate, achievementController.getAchievements);

/**
 * Get Achievement By ID
 */
router.get('/:id', authenticate, achievementController.getAchievementById);

/**
 * Update Achievement
 */
router.put('/:id', authenticate, achievementController.updateAchievement);

/**
 * Delete Achievement
 */
router.delete('/:id', authenticate, achievementController.deleteAchievement);

export default router;