import { Types } from 'mongoose';

import {
  CreateExperienceDto,
  UpdateExperienceDto,
} from '../dto/experience.dto';

import { ExperienceDocument } from '../interfaces/experience.interface';

import { Experience } from '../models/experience.model';

export class ExperienceRepository {
  /**
   * Create Experience
   */
  public async create(
    userId: Types.ObjectId,
    experience: CreateExperienceDto,
  ): Promise<ExperienceDocument> {
    return Experience.create({
      userId,
      ...experience,
    });
  }

  /**
   * Find All Experiences By User
   */
  public async findAllByUserId(
    userId: Types.ObjectId,
  ): Promise<ExperienceDocument[]> {
    return Experience.find({
      userId,
    }).sort({
      displayOrder: 1,
      startDate: -1,
      createdAt: 1,
    });
  }

  /**
   * Find Experience By ID And User
   */
  public async findByIdAndUserId(
    id: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<ExperienceDocument | null> {
    return Experience.findOne({
      _id: id,
      userId,
    });
  }

  /**
   * Update Experience
   */
  public async update(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    experience: UpdateExperienceDto,
  ): Promise<ExperienceDocument | null> {
    return Experience.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        $set: experience,
      },
      {
        new: true,
      },
    );
  }

  /**
   * Delete Experience
   */
  public async delete(
    id: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<ExperienceDocument | null> {
    return Experience.findOneAndDelete({
      _id: id,
      userId,
    });
  }
}