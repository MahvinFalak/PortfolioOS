import { Types } from 'mongoose';

import { ConflictException } from '../../../app/exceptions/conflict.exception';
import { NotFoundException } from '../../../app/exceptions/not-found.exception';

import {
  CreateProfileDto,
  ProfileResponseDto,
  UpdateProfileDto,
} from '../dto/profile.dto';

import { ProfileDocument } from '../interfaces/profile.interface';

import { ProfileRepository } from '../repositories/profile.repository';

export class ProfileService {
  private readonly profileRepository =
    new ProfileRepository();

  /**
   * Convert Profile Document to Response DTO
   */
  private mapToResponse(
    profile: ProfileDocument,
  ): ProfileResponseDto {
    return {
      id: profile._id.toString(),
      userId: profile.userId.toString(),
      firstName: profile.firstName,
      lastName: profile.lastName,
      headline: profile.headline,
      about: profile.about,
      profileImage: profile.profileImage,
      resumeUrl: profile.resumeUrl,
      phone: profile.phone,
      location: profile.location,
      socialLinks: profile.socialLinks ?? {},
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }

  /**
   * Create Profile
   */
  public async createProfile(
    userId: string,
    profileDto: CreateProfileDto,
  ): Promise<ProfileResponseDto> {
    const existingProfile =
      await this.profileRepository.findByUserId(
        new Types.ObjectId(userId),
      );

    if (existingProfile) {
      throw new ConflictException(
        'Profile already exists.',
      );
    }

    const profile =
      await this.profileRepository.create(
        new Types.ObjectId(userId),
        profileDto,
      );

    return this.mapToResponse(profile);
  }

  /**
   * Get Profile
   */
  public async getProfile(
    userId: string,
  ): Promise<ProfileResponseDto> {
    const profile =
      await this.profileRepository.findByUserId(
        new Types.ObjectId(userId),
      );

    if (!profile) {
      throw new NotFoundException(
        'Profile not found.',
      );
    }

    return this.mapToResponse(profile);
  }

  /**
   * Update Profile
   */
  public async updateProfile(
    userId: string,
    profileDto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    const profile =
      await this.profileRepository.update(
        new Types.ObjectId(userId),
        profileDto,
      );

    if (!profile) {
      throw new NotFoundException(
        'Profile not found.',
      );
    }

    return this.mapToResponse(profile);
  }
}