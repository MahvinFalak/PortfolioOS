import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../../../app/middlewares/auth.middleware';

const router = Router();

const authController = new AuthController();

/**
 * Register
 */
router.post('/register', authController.register);

/**
 * Login
 */
router.post('/login', authController.login);
/**
 * Refresh Access Token
 * POST /api/auth/refresh
 */
router.post('/refresh', authController.refreshToken);
/**
 * Logout User
 */
router.post('/logout', authenticate, authController.logout);

export default router;
