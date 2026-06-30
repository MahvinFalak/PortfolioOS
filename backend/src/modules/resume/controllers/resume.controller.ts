import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';

import { CreateResumeDto, UpdateResumeDto } from '../dto/resume.dto';
import { ResumeService } from '../services/resume.service';
import {
  createResumeSchema,
  updateResumeSchema,
} from '../validations/resume.validation';

interface ResumeParams extends ParamsDictionary {
  id: string;
}

export class ResumeController {
  private readonly resumeService = new ResumeService();

  /**
   * Create Resume
   */
  public createResume = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult = createResumeSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const resumeDto: CreateResumeDto = validationResult.data;

      const resume = await this.resumeService.create(
        req.user!.userId,
        resumeDto,
      );

      res.status(201).json({
        success: true,
        message: 'Resume created successfully.',
        data: resume,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get Active Resume
   */
  public getActiveResume = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const resume = await this.resumeService.getActive(req.user!.userId);

      res.status(200).json({
        success: true,
        message: 'Active resume fetched successfully.',
        data: resume,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get All Resumes
   */
  public getResumes = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const resumes = await this.resumeService.getAll(req.user!.userId);

      res.status(200).json({
        success: true,
        message: 'Resumes fetched successfully.',
        data: resumes,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get Resume By ID
   */
  public getResumeById = async (
    req: Request<ResumeParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const resume = await this.resumeService.getById(
        req.params.id,
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Resume fetched successfully.',
        data: resume,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update Resume
   */
  public updateResume = async (
    req: Request<ResumeParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult = updateResumeSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const resumeDto: UpdateResumeDto = validationResult.data;

      const resume = await this.resumeService.update(
        req.params.id,
        req.user!.userId,
        resumeDto,
      );

      res.status(200).json({
        success: true,
        message: 'Resume updated successfully.',
        data: resume,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete Resume
   */
  public deleteResume = async (
    req: Request<ResumeParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.resumeService.delete(req.params.id, req.user!.userId);

      res.status(200).json({
        success: true,
        message: 'Resume deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  };
}