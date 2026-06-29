import { Router, Request, Response } from 'express';

import authRoutes from '../../modules/auth/routes/auth.routes';

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
export default router;