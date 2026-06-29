import { NextFunction, Request, Response } from 'express';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';

import {
  CreateProfileDto,
  UpdateProfileDto,
} from '../dto/profile.dto';

import { ProfileService } from '../services/profile.service';

import {
  createProfileSchema,
  updateProfileSchema,
} from '../validations/profile.validation';

export class ProfileController {
  private readonly profileService =
    new ProfileService();

  /**
   * Create Profile
   */
  public createProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult =
        createProfileSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const profileDto: CreateProfileDto =
        validationResult.data;

      const profile =
        await this.profileService.createProfile(
          req.user!.userId,
          profileDto,
        );

      res.status(201).json({
        success: true,
        message: 'Profile created successfully.',
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get Profile
   */
  public getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const profile =
        await this.profileService.getProfile(
          req.user!.userId,
        );

      res.status(200).json({
        success: true,
        message: 'Profile fetched successfully.',
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update Profile
   */
  public updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validationResult =
        updateProfileSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new BadRequestException(
          validationResult.error.issues[0].message,
        );
      }

      const profileDto: UpdateProfileDto =
        validationResult.data;

      const profile =
        await this.profileService.updateProfile(
          req.user!.userId,
          profileDto,
        );

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully.',
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  };
}