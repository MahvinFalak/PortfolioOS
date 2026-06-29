import { Types } from 'mongoose';

import { Profile } from '../models/profile.model';
import { ProfileDocument } from '../interfaces/profile.interface';
import {
  CreateProfileDto,
  UpdateProfileDto,
} from '../dto/profile.dto';

export class ProfileRepository {
      /**
   * Create Profile
   */
  public async create(
    userId: Types.ObjectId,
    profile: CreateProfileDto,
  ): Promise<ProfileDocument> {
    return Profile.create({
      userId,
      ...profile,
    });
  }
    /**
   * Find Profile by User ID
   */
  public async findByUserId(
    userId: Types.ObjectId,
  ): Promise<ProfileDocument | null> {
    return Profile.findOne({
      userId,
    });
  }
    /**
   * Update Profile
   */
  public async update(
    userId: Types.ObjectId,
    profile: UpdateProfileDto,
  ): Promise<ProfileDocument | null> {
    return Profile.findOneAndUpdate(
      {
        userId,
      },
      {
        $set: profile,
      },
      {
        new: true,
      },
    );
  }
    /**
   * Delete Profile
   */
  public async delete(
    userId: Types.ObjectId,
  ): Promise<ProfileDocument | null> {
    return Profile.findOneAndDelete({
      userId,
    });
  }
  }