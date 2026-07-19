import { NextFunction, Request, Response } from 'express';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';
import { ParamsDictionary } from 'express-serve-static-core';

import { CreateSkillDto, UpdateSkillDto } from '../dto/skill.dto';

import { SkillService } from '../services/skill.service';

import {
  createSkillSchema,
  updateSkillSchema,
} from '../validations/skill.validation';

interface SkillParams extends ParamsDictionary {
  id: string;
}

export class SkillController {
  private readonly skillService = new SkillService();

  /**
   * Create Skill
   */
  public createSkill = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult = createSkillSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(validationResult.error.issues[0].message);
      }

      const skillDto: CreateSkillDto = validationResult.data;

      const skill = await this.skillService.createSkill(
        req.user!.userId,
        skillDto,
      );

      res.status(201).json({
        success: true,
        message: 'Skill created successfully.',
        data: skill,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get All Skills
   */
  public getSkills = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const skills = await this.skillService.getSkills(
        req.user!.userId);

      res.status(200).json({
        success: true,
        message: 'Skills fetched successfully.',
        data: skills,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get Skill By ID
   */
  public getSkillById = async (
    req: Request<SkillParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const skill = await this.skillService.getSkillById(
        req.params.id,
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Skill fetched successfully.',
        data: skill,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update Skill
   */
  public updateSkill = async (
    req: Request<SkillParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult = updateSkillSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(validationResult.error.issues[0].message);
      }

      const skillDto: UpdateSkillDto = validationResult.data;

      const skill = await this.skillService.updateSkill(
        req.params.id,
        req.user!.userId,
        skillDto,
      );

      res.status(200).json({
        success: true,
        message: 'Skill updated successfully.',
        data: skill,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete Skill
   */
  public deleteSkill = async (
    req: Request<SkillParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.skillService.deleteSkill(
        req.params.id,
        req.user!.userId,);

      res.status(200).json({
        success: true,
        message: 'Skill deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  };
}
