import { Router } from 'express';

import { authenticate } from '../../../app/middlewares/auth.middleware';

import { EducationController } from '../controllers/education.controller';

const router = Router();

const educationController = new EducationController();

/**
 * Create Education
 */
router.post('/', authenticate, educationController.createEducation);

/**
 * Get All Education Records
 */
router.get('/', authenticate, educationController.getEducationList);

/**
 * Get Education By ID
 */
router.get('/:id', authenticate, educationController.getEducationById);

/**
 * Update Education
 */
router.put('/:id', authenticate, educationController.updateEducation);

/**
 * Delete Education
 */
router.delete('/:id', authenticate, educationController.deleteEducation);

export default router;