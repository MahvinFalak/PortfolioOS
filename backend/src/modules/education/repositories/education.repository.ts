import { Types } from 'mongoose';

import {
  CreateEducationDto,
  UpdateEducationDto,
} from '../dto/education.dto';
import { EducationDocument } from '../interfaces/education.interface';
import { EducationModel } from '../models/education.model';

export class EducationRepository {
  async create(
    userId: Types.ObjectId,
    dto: CreateEducationDto,
  ): Promise<EducationDocument> {
    return EducationModel.create({
      ...dto,
      userId,
    });
  }

  async findAllByUserId(userId: Types.ObjectId): Promise<EducationDocument[]> {
    return EducationModel.find({ userId })
      .sort({ displayOrder: 1, startDate: -1 })
      .exec();
  }

  async findByIdAndUserId(
    id: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<EducationDocument | null> {
    return EducationModel.findOne({
      _id: id,
      userId,
    }).exec();
  }

  async update(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    dto: UpdateEducationDto,
  ): Promise<EducationDocument | null> {
    return EducationModel.findOneAndUpdate(
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
  ): Promise<EducationDocument | null> {
    return EducationModel.findOneAndDelete({
      _id: id,
      userId,
    }).exec();
  }
}