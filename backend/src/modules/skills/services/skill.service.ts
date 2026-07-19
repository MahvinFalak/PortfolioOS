import { Types } from 'mongoose';

import { NotFoundException } from '../../../app/exceptions/not-found.exception';

import {
  CreateSkillDto,
  SkillResponseDto,
  UpdateSkillDto,
} from '../dto/skill.dto';

import { SkillRepository } from '../repositories/skill.repository';
import { SkillDocument } from '../interfaces/skill.interface';

export class SkillService {
  private readonly skillRepository = new SkillRepository();
  /**
   * Convert Skill Document to Response DTO
   */
  private mapToResponse(skill: SkillDocument): SkillResponseDto {
    return {
      id: skill._id.toString(),
      userId: skill.userId.toString(),
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon,
      displayOrder: skill.displayOrder,
      createdAt: skill.createdAt,
      updatedAt: skill.updatedAt,
    };
  }
  /**
   * Create Skill
   */
  public async createSkill(
    userId: string,
    skillDto: CreateSkillDto,
  ): Promise<SkillResponseDto> {
    const skill = await this.skillRepository.create(
      new Types.ObjectId(userId),
      skillDto,
    );

    return this.mapToResponse(skill);
  }
  /**
   * Get All Skills
   */
  public async getSkills(userId: string): Promise<SkillResponseDto[]> {
    const skills = await this.skillRepository.findAllByUserId(
      new Types.ObjectId(userId),
    );

    return skills.map((skill) => this.mapToResponse(skill));
  }
  /**
   * Get Skill By ID
   */
  public async getSkillById(
    id: string,
    userId: string,
  ): Promise<SkillResponseDto> {
    const skill = await this.skillRepository.findByIdAndUserId(
      new Types.ObjectId(id),
      new Types.ObjectId(userId),
    );
    if (!skill) {
      throw new NotFoundException('Skill not found.');
    }

    return this.mapToResponse(skill);
  }
  /**
   * Update Skill
   */
  public async updateSkill(
    id: string,
    userId: string,
    skillDto: UpdateSkillDto,
  ): Promise<SkillResponseDto> {
    const skill = await this.skillRepository.update(
      new Types.ObjectId(id),
      new Types.ObjectId(userId),
      skillDto,
    );

    if (!skill) {
      throw new NotFoundException('Skill not found.');
    }

    return this.mapToResponse(skill);
  }
  /**
   * Delete Skill
   */
  public async deleteSkill(id: string,userId: string): Promise<void> {
    const skill = await this.skillRepository.delete(
      new Types.ObjectId(id),
      new Types.ObjectId(userId),

    );
    if (!skill) {
      throw new NotFoundException('Skill not found.');
    }
  }
}
