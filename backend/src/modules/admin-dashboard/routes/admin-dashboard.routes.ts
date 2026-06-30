import { Router } from 'express';

import { authenticate } from '../../../app/middlewares/auth.middleware';

import { AdminDashboardController } from '../controllers/admin-dashboard.controller';

const router = Router();

const adminDashboardController = new AdminDashboardController();

/**
 * Get Admin Dashboard Summary
 */
router.get('/summary', authenticate, adminDashboardController.getSummary);

export default router;