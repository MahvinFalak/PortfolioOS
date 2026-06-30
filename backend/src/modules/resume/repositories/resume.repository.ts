import { Types } from 'mongoose';

import {
  CreateResumeDto,
  UpdateResumeDto,
} from '../dto/resume.dto';
import { ResumeDocument } from '../interfaces/resume.interface';
import { ResumeModel } from '../models/resume.model';

export class ResumeRepository {
  async create(
    userId: Types.ObjectId,
    dto: CreateResumeDto,
  ): Promise<ResumeDocument> {
    return ResumeModel.create({
      ...dto,
      userId,
    });
  }

  async findActiveByUserId(
    userId: Types.ObjectId,
  ): Promise<ResumeDocument | null> {
    return ResumeModel.findOne({
      userId,
      active: true,
    }).exec();
  }

  async findAllByUserId(
    userId: Types.ObjectId,
  ): Promise<ResumeDocument[]> {
    return ResumeModel.find({ userId })
      .sort({ uploadedAt: -1, createdAt: -1 })
      .exec();
  }

  async findByIdAndUserId(
    id: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<ResumeDocument | null> {
    return ResumeModel.findOne({
      _id: id,
      userId,
    }).exec();
  }

  async update(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    dto: UpdateResumeDto,
  ): Promise<ResumeDocument | null> {
    return ResumeModel.findOneAndUpdate(
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

  async deactivateActiveByUserId(
    userId: Types.ObjectId,
  ): Promise<void> {
    await ResumeModel.updateMany(
      {
        userId,
        active: true,
      },
      {
        $set: {
          active: false,
        },
      },
    ).exec();
  }

  async delete(
    id: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<ResumeDocument | null> {
    return ResumeModel.findOneAndDelete({
      _id: id,
      userId,
    }).exec();
  }
}