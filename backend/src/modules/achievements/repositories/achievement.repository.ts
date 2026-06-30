import { Types } from 'mongoose';

import {
  CreateAchievementDto,
  UpdateAchievementDto,
} from '../dto/achievement.dto';
import { AchievementDocument } from '../interfaces/achievement.interface';
import { AchievementModel } from '../models/achievement.model';

export class AchievementRepository {
  async create(
    userId: Types.ObjectId,
    dto: CreateAchievementDto,
  ): Promise<AchievementDocument> {
    return AchievementModel.create({
      ...dto,
      userId,
    });
  }

  async findAllByUserId(
    userId: Types.ObjectId,
  ): Promise<AchievementDocument[]> {
    return AchievementModel.find({ userId })
      .sort({ displayOrder: 1, achievementDate: -1 })
      .exec();
  }

  async findByIdAndUserId(
    id: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<AchievementDocument | null> {
    return AchievementModel.findOne({
      _id: id,
      userId,
    }).exec();
  }

  async update(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    dto: UpdateAchievementDto,
  ): Promise<AchievementDocument | null> {
    return AchievementModel.findOneAndUpdate(
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
  ): Promise<AchievementDocument | null> {
    return AchievementModel.findOneAndDelete({
      _id: id,
      userId,
    }).exec();
  }
}