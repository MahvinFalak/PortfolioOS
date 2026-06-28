import { Router, Request, Response } from 'express';

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

export default router;