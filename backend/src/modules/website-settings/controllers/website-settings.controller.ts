import { NextFunction, Request, Response } from 'express';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';

import {
  CreateWebsiteSettingsDto,
  UpdateWebsiteSettingsDto,
} from '../dto/website-settings.dto';
import { WebsiteSettingsService } from '../services/website-settings.service';
import {
  createWebsiteSettingsSchema,
  updateWebsiteSettingsSchema,
} from '../validations/website-settings.validation';

export class WebsiteSettingsController {
  private readonly websiteSettingsService = new WebsiteSettingsService();

  /**
   * Create Website Settings
   */
  public createWebsiteSettings = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult = createWebsiteSettingsSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const websiteSettingsDto: CreateWebsiteSettingsDto =
        validationResult.data;

      const settings = await this.websiteSettingsService.create(
        req.user!.userId,
        websiteSettingsDto,
      );

      res.status(201).json({
        success: true,
        message: 'Website settings created successfully.',
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get Website Settings
   */
  public getWebsiteSettings = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const settings = await this.websiteSettingsService.get(
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Website settings fetched successfully.',
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update Website Settings
   */
  public updateWebsiteSettings = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult = updateWebsiteSettingsSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const websiteSettingsDto: UpdateWebsiteSettingsDto =
        validationResult.data;

      const settings = await this.websiteSettingsService.update(
        req.user!.userId,
        websiteSettingsDto,
      );

      res.status(200).json({
        success: true,
        message: 'Website settings updated successfully.',
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };
}