import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';

import {
  CreateSocialLinkDto,
  UpdateSocialLinkDto,
} from '../dto/social-link.dto';
import { SocialLinkService } from '../services/social-link.service';
import {
  createSocialLinkSchema,
  updateSocialLinkSchema,
} from '../validations/social-link.validation';

interface SocialLinkParams extends ParamsDictionary {
  id: string;
}

export class SocialLinkController {
  private readonly socialLinkService = new SocialLinkService();

  /**
   * Create Social Link
   */
  public createSocialLink = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult = createSocialLinkSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const socialLinkDto: CreateSocialLinkDto = validationResult.data;

      const socialLink = await this.socialLinkService.create(
        req.user!.userId,
        socialLinkDto,
      );

      res.status(201).json({
        success: true,
        message: 'Social link created successfully.',
        data: socialLink,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get All Social Links
   */
  public getSocialLinks = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const socialLinks = await this.socialLinkService.getAll(
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Social links fetched successfully.',
        data: socialLinks,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get Social Link By ID
   */
  public getSocialLinkById = async (
    req: Request<SocialLinkParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const socialLink = await this.socialLinkService.getById(
        req.params.id,
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Social link fetched successfully.',
        data: socialLink,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update Social Link
   */
  public updateSocialLink = async (
    req: Request<SocialLinkParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult = updateSocialLinkSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const socialLinkDto: UpdateSocialLinkDto = validationResult.data;

      const socialLink = await this.socialLinkService.update(
        req.params.id,
        req.user!.userId,
        socialLinkDto,
      );

      res.status(200).json({
        success: true,
        message: 'Social link updated successfully.',
        data: socialLink,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete Social Link
   */
  public deleteSocialLink = async (
    req: Request<SocialLinkParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.socialLinkService.delete(req.params.id, req.user!.userId);

      res.status(200).json({
        success: true,
        message: 'Social link deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  };
}