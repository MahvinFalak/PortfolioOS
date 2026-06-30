import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';

import {
  CreateEducationDto,
  UpdateEducationDto,
} from '../dto/education.dto';
import { EducationService } from '../services/education.service';
import {
  createEducationSchema,
  updateEducationSchema,
} from '../validations/education.validation';

interface EducationParams extends ParamsDictionary {
  id: string;
}

export class EducationController {
  private readonly educationService = new EducationService();

  /**
   * Create Education
   */
  public createEducation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult = createEducationSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const educationDto: CreateEducationDto = validationResult.data;

      const education = await this.educationService.create(
        req.user!.userId,
        educationDto,
      );

      res.status(201).json({
        success: true,
        message: 'Education record created successfully.',
        data: education,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get All Education Records
   */
  public getEducationList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const educationList = await this.educationService.getAll(
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Education records fetched successfully.',
        data: educationList,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get Education By ID
   */
  public getEducationById = async (
    req: Request<EducationParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const education = await this.educationService.getById(
        req.params.id,
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Education record fetched successfully.',
        data: education,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update Education
   */
  public updateEducation = async (
    req: Request<EducationParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult = updateEducationSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const educationDto: UpdateEducationDto = validationResult.data;

      const education = await this.educationService.update(
        req.params.id,
        req.user!.userId,
        educationDto,
      );

      res.status(200).json({
        success: true,
        message: 'Education record updated successfully.',
        data: education,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete Education
   */
  public deleteEducation = async (
    req: Request<EducationParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.educationService.delete(req.params.id, req.user!.userId);

      res.status(200).json({
        success: true,
        message: 'Education record deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  };
}