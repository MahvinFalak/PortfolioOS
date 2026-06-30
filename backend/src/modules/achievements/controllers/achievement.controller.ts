import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';

import {
  CreateAchievementDto,
  UpdateAchievementDto,
} from '../dto/achievement.dto';
import { AchievementService } from '../services/achievement.service';
import {
  createAchievementSchema,
  updateAchievementSchema,
} from '../validations/achievement.validation';

interface AchievementParams extends ParamsDictionary {
  id: string;
}

export class AchievementController {
  private readonly achievementService = new AchievementService();

  /**
   * Create Achievement
   */
  public createAchievement = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult = createAchievementSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const achievementDto: CreateAchievementDto = validationResult.data;

      const achievement = await this.achievementService.create(
        req.user!.userId,
        achievementDto,
      );

      res.status(201).json({
        success: true,
        message: 'Achievement created successfully.',
        data: achievement,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get All Achievements
   */
  public getAchievements = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const achievements = await this.achievementService.getAll(
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Achievements fetched successfully.',
        data: achievements,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get Achievement By ID
   */
  public getAchievementById = async (
    req: Request<AchievementParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const achievement = await this.achievementService.getById(
        req.params.id,
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Achievement fetched successfully.',
        data: achievement,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update Achievement
   */
  public updateAchievement = async (
    req: Request<AchievementParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult = updateAchievementSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const achievementDto: UpdateAchievementDto = validationResult.data;

      const achievement = await this.achievementService.update(
        req.params.id,
        req.user!.userId,
        achievementDto,
      );

      res.status(200).json({
        success: true,
        message: 'Achievement updated successfully.',
        data: achievement,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete Achievement
   */
  public deleteAchievement = async (
    req: Request<AchievementParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.achievementService.delete(req.params.id, req.user!.userId);

      res.status(200).json({
        success: true,
        message: 'Achievement deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  };
}