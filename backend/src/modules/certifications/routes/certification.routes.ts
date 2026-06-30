import { Router } from 'express';

import { authenticate } from '../../../app/middlewares/auth.middleware';

import { CertificationController } from '../controllers/certification.controller';

const router = Router();

const certificationController = new CertificationController();

/**
 * Create Certification
 */
router.post('/', authenticate, certificationController.createCertification);

/**
 * Get All Certifications
 */
router.get('/', authenticate, certificationController.getCertifications);

/**
 * Get Certification By ID
 */
router.get('/:id', authenticate, certificationController.getCertificationById);

/**
 * Update Certification
 */
router.put('/:id', authenticate, certificationController.updateCertification);

/**
 * Delete Certification
 */
router.delete('/:id', authenticate, certificationController.deleteCertification);

export default router;