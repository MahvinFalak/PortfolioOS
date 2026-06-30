import { Types } from 'mongoose';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';
import { NotFoundException } from '../../../app/exceptions/not-found.exception';

import {
  AchievementResponseDto,
  CreateAchievementDto,
  UpdateAchievementDto,
} from '../dto/achievement.dto';
import { AchievementDocument } from '../interfaces/achievement.interface';
import { AchievementRepository } from '../repositories/achievement.repository';

export class AchievementService {
  private readonly achievementRepository = new AchievementRepository();

  async create(
    userId: string,
    dto: CreateAchievementDto,
  ): Promise<AchievementResponseDto> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    const achievement = await this.achievementRepository.create(
      userObjectId,
      dto,
    );

    return this.mapToResponse(achievement);
  }

  async getAll(userId: string): Promise<AchievementResponseDto[]> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    const achievements =
      await this.achievementRepository.findAllByUserId(userObjectId);

    return achievements.map((achievement) =>
      this.mapToResponse(achievement),
    );
  }

  async getById(
    id: string,
    userId: string,
  ): Promise<AchievementResponseDto> {
    const achievementObjectId = this.toObjectId(id, 'Achievement ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const achievement = await this.achievementRepository.findByIdAndUserId(
      achievementObjectId,
      userObjectId,
    );

    if (!achievement) {
      throw new NotFoundException('Achievement not found.');
    }

    return this.mapToResponse(achievement);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateAchievementDto,
  ): Promise<AchievementResponseDto> {
    const achievementObjectId = this.toObjectId(id, 'Achievement ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const achievement = await this.achievementRepository.update(
      achievementObjectId,
      userObjectId,
      dto,
    );

    if (!achievement) {
      throw new NotFoundException('Achievement not found.');
    }

    return this.mapToResponse(achievement);
  }

  async delete(id: string, userId: string): Promise<void> {
    const achievementObjectId = this.toObjectId(id, 'Achievement ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const achievement = await this.achievementRepository.delete(
      achievementObjectId,
      userObjectId,
    );

    if (!achievement) {
      throw new NotFoundException('Achievement not found.');
    }
  }

  private toObjectId(value: string, fieldName: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${fieldName} is invalid.`);
    }

    return new Types.ObjectId(value);
  }

  private mapToResponse(
    achievement: AchievementDocument,
  ): AchievementResponseDto {
    return {
      id: achievement._id.toString(),
      userId: achievement.userId.toString(),
      title: achievement.title,
      description: achievement.description,
      category: achievement.category,
      issuer: achievement.issuer,
      achievementDate: achievement.achievementDate,
      url: achievement.url,
      image: achievement.image,
      featured: achievement.featured,
      displayOrder: achievement.displayOrder,
      createdAt: achievement.createdAt,
      updatedAt: achievement.updatedAt,
    };
  }
}