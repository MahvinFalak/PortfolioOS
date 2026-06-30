import { Router } from 'express';

import { authenticate } from '../../../app/middlewares/auth.middleware';

import { ProjectController } from '../controllers/project.controller';

const router = Router();

const projectController = new ProjectController();

/**
 * Create Project
 */
router.post('/', authenticate, projectController.createProject);

/**
 * Get All Projects
 */
router.get('/', authenticate, projectController.getProjects);

/**
 * Get Project By ID
 */
router.get('/:id', authenticate, projectController.getProjectById);

/**
 * Update Project
 */
router.put('/:id', authenticate, projectController.updateProject);

/**
 * Delete Project
 */
router.delete('/:id', authenticate, projectController.deleteProject);

export default router;