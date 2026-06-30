import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';

import {
  CreateCertificationDto,
  UpdateCertificationDto,
} from '../dto/certification.dto';
import { CertificationService } from '../services/certification.service';
import {
  createCertificationSchema,
  updateCertificationSchema,
} from '../validations/certification.validation';

interface CertificationParams extends ParamsDictionary {
  id: string;
}

export class CertificationController {
  private readonly certificationService = new CertificationService();

  /**
   * Create Certification
   */
  public createCertification = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult = createCertificationSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const certificationDto: CreateCertificationDto = validationResult.data;

      const certification = await this.certificationService.create(
        req.user!.userId,
        certificationDto,
      );

      res.status(201).json({
        success: true,
        message: 'Certification created successfully.',
        data: certification,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get All Certifications
   */
  public getCertifications = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const certifications = await this.certificationService.getAll(
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Certifications fetched successfully.',
        data: certifications,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get Certification By ID
   */
  public getCertificationById = async (
    req: Request<CertificationParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const certification = await this.certificationService.getById(
        req.params.id,
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Certification fetched successfully.',
        data: certification,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update Certification
   */
  public updateCertification = async (
    req: Request<CertificationParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult = updateCertificationSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const certificationDto: UpdateCertificationDto = validationResult.data;

      const certification = await this.certificationService.update(
        req.params.id,
        req.user!.userId,
        certificationDto,
      );

      res.status(200).json({
        success: true,
        message: 'Certification updated successfully.',
        data: certification,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete Certification
   */
  public deleteCertification = async (
    req: Request<CertificationParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.certificationService.delete(
        req.params.id,
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Certification deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  };
}