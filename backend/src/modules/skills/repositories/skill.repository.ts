import { Types } from 'mongoose';

import { CreateSkillDto, UpdateSkillDto } from '../dto/skill.dto';
import { SkillDocument } from '../interfaces/skill.interface';
import { Skill } from '../models/skill.model';

export class SkillRepository {
  /**
   * Create Skill
   */
  public async create(
    userId: Types.ObjectId,
    skill: CreateSkillDto,
  ): Promise<SkillDocument> {
    return Skill.create({
      userId,
      ...skill,
    });
  }
  /**
   * Find All Skills By User
   */
  public async findAllByUserId(
    userId: Types.ObjectId,
  ): Promise<SkillDocument[]> {
    return Skill.find({
      userId,
    }).sort({
      displayOrder: 1,
      createdAt: 1,
    });
  }
  /**
   * Find Skill By ID
   */
  // public async findById(
  //   id: Types.ObjectId,
  // ): Promise<SkillDocument | null> {
  //   return Skill.findById(id);
  // }
  /**
   * Find Skill By ID And User
   */
  public async findByIdAndUserId(
    id: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<SkillDocument | null> {
    console.log(Skill,"repository ")
    return Skill.findOne({
      _id: id,
      userId,
    }).exec();
  }
  /**
   * Update Skill
   */
  public async update(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    skill: UpdateSkillDto,
  ): Promise<SkillDocument | null> {
    return Skill.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        $set: skill,
      },
      {
        new: true,
      },
    );
  }
  /**
   * Delete Skill
   */
  public async delete(
    id: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<SkillDocument | null> {
    return Skill.findOneAndDelete({
      _id: id,
      userId,
    });
  }
}
