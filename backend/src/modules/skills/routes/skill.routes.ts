import { Router } from 'express';

import { authenticate } from '../../../app/middlewares/auth.middleware';

import { SkillController } from '../controllers/skill.controller';

const router = Router();

const skillController = new SkillController();

/**
 * Create Skill
 */
router.post(
  '/',
  authenticate,
  skillController.createSkill,
);

/**
 * Get All Skills
 */
router.get(
  '/',
  authenticate,
  skillController.getSkills,
);

/**
 * Get Skill By ID
 */
router.get(
  '/:id',
  authenticate,
  skillController.getSkillById,
);

/**
 * Update Skill
 */
router.put(
  '/:id',
  authenticate,
  skillController.updateSkill,
);

/**
 * Delete Skill
 */
router.delete(
  '/:id',
  authenticate,
  skillController.deleteSkill,
);

export default router;