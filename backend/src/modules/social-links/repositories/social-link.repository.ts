import { Types } from 'mongoose';

import {
  CreateSocialLinkDto,
  UpdateSocialLinkDto,
} from '../dto/social-link.dto';
import { SocialLinkDocument } from '../interfaces/social-link.interface';
import { SocialLinkModel } from '../models/social-link.model';

export class SocialLinkRepository {
  async create(
    userId: Types.ObjectId,
    dto: CreateSocialLinkDto,
  ): Promise<SocialLinkDocument> {
    return SocialLinkModel.create({
      ...dto,
      userId,
    });
  }

  async findAllByUserId(
    userId: Types.ObjectId,
  ): Promise<SocialLinkDocument[]> {
    return SocialLinkModel.find({ userId })
      .sort({ displayOrder: 1, platform: 1 })
      .exec();
  }

  async findByIdAndUserId(
    id: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<SocialLinkDocument | null> {
    return SocialLinkModel.findOne({
      _id: id,
      userId,
    }).exec();
  }

  async findByPlatformAndUserId(
    platform: string,
    userId: Types.ObjectId,
    excludeId?: Types.ObjectId,
  ): Promise<SocialLinkDocument | null> {
    const query = excludeId
      ? {
          platform,
          userId,
          _id: {
            $ne: excludeId,
          },
        }
      : {
          platform,
          userId,
        };

    return SocialLinkModel.findOne(query).exec();
  }

  async update(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    dto: UpdateSocialLinkDto,
  ): Promise<SocialLinkDocument | null> {
    return SocialLinkModel.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        $set: dto,
      },
      {
        new: true,
        runValidators: true,
      },
    ).exec();
  }

  async delete(
    id: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<SocialLinkDocument | null> {
    return SocialLinkModel.findOneAndDelete({
      _id: id,
      userId,
    }).exec();
  }
}