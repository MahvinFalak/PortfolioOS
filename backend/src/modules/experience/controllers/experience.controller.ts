import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';

import {
  CreateExperienceDto,
  UpdateExperienceDto,
} from '../dto/experience.dto';

import { ExperienceService } from '../services/experience.service';

import {
  createExperienceSchema,
  updateExperienceSchema,
} from '../validations/experience.validation';

interface ExperienceParams extends ParamsDictionary {
  id: string;
}

export class ExperienceController {
  private readonly experienceService =
    new ExperienceService();

  /**
   * Create Experience
   */
  public createExperience = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult =
        createExperienceSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const experienceDto: CreateExperienceDto =
        validationResult.data;

      const experience =
        await this.experienceService.createExperience(
          req.user!.userId,
          experienceDto,
        );

      res.status(201).json({
        success: true,
        message: 'Experience created successfully.',
        data: experience,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get All Experiences
   */
  public getExperiences = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const experiences =
        await this.experienceService.getExperiences(
          req.user!.userId,
        );

      res.status(200).json({
        success: true,
        message: 'Experiences fetched successfully.',
        data: experiences,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get Experience By ID
   */
  public getExperienceById = async (
    req: Request<ExperienceParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const experience =
        await this.experienceService.getExperienceById(
          req.params.id,
          req.user!.userId,
        );

      res.status(200).json({
        success: true,
        message: 'Experience fetched successfully.',
        data: experience,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update Experience
   */
  public updateExperience = async (
    req: Request<ExperienceParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult =
        updateExperienceSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const experienceDto: UpdateExperienceDto =
        validationResult.data;

      const experience =
        await this.experienceService.updateExperience(
          req.params.id,
          req.user!.userId,
          experienceDto,
        );

      res.status(200).json({
        success: true,
        message: 'Experience updated successfully.',
        data: experience,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete Experience
   */
  public deleteExperience = async (
    req: Request<ExperienceParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.experienceService.deleteExperience(
        req.params.id,
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Experience deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  };
}