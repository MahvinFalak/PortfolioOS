import { Router } from 'express';

import { authenticate } from '../../../app/middlewares/auth.middleware';

import { ResumeController } from '../controllers/resume.controller';

const router = Router();

const resumeController = new ResumeController();

/**
 * Create Resume
 */
router.post('/', authenticate, resumeController.createResume);

/**
 * Get Active Resume
 */
router.get('/active', authenticate, resumeController.getActiveResume);

/**
 * Get All Resumes
 */
router.get('/', authenticate, resumeController.getResumes);

/**
 * Get Resume By ID
 */
router.get('/:id', authenticate, resumeController.getResumeById);

/**
 * Update Resume
 */
router.put('/:id', authenticate, resumeController.updateResume);

/**
 * Delete Resume
 */
router.delete('/:id', authenticate, resumeController.deleteResume);

export default router;