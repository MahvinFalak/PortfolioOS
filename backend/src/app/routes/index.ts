import { Router, Request, Response } from 'express';

import authRoutes from '../../modules/auth/routes/auth.routes';

import profileRoutes from '../../modules/profile/routes';

import skillRoutes from '../../modules/skills/routes';
import experienceRoutes from '../../modules/experience/routes';
import projectRoutes from '../../modules/projects/routes';
import resumeRoutes from '../../modules/resume/routes';
import certificationRoutes from '../../modules/certifications/routes';

const router = Router();

/**
 * Health Check Endpoint
 */
router.get('/health', (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'PortfolioOS API is running',
    timestamp: new Date().toISOString(),
  });
});
/**
 * Authentication Routes
 */
router.use('/api/auth', authRoutes);
/**
 * Profile
 */
router.use('/api/profile', profileRoutes);
/**
 * Skills
 */
router.use('/api/skills', skillRoutes);
/**
 * Experience
 */
router.use('/api/experiences', experienceRoutes);

/**
 * Projects
 */
router.use('/api/projects', projectRoutes);

/**
 * Resume
 */
router.use('/api/resume', resumeRoutes);

/**
 * Certifications
 */
router.use('/api/certifications', certificationRoutes);
export default router;
