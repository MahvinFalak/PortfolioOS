import { Types } from 'mongoose';

import { NotFoundException } from '../../../app/exceptions/not-found.exception';

import {
  CreateExperienceDto,
  ExperienceResponseDto,
  UpdateExperienceDto,
} from '../dto/experience.dto';

import { ExperienceDocument } from '../interfaces/experience.interface';

import { ExperienceRepository } from '../repositories/experience.repository';

export class ExperienceService {
  private readonly experienceRepository =
    new ExperienceRepository();

  /**
   * Convert Experience Document to Response DTO
   */
  private mapToResponse(
    experience: ExperienceDocument,
  ): ExperienceResponseDto {
    return {
      id: experience._id.toString(),
      userId: experience.userId.toString(),
      company: experience.company,
      position: experience.position,
      employmentType: experience.employmentType,
      location: experience.location,
      locationType: experience.locationType,
      startDate: experience.startDate,
      endDate: experience.endDate,
      isCurrent: experience.isCurrent,
      description: experience.description,
      technologies: experience.technologies,
      displayOrder: experience.displayOrder,
      createdAt: experience.createdAt,
      updatedAt: experience.updatedAt,
    };
  }

  /**
   * Create Experience
   */
  public async createExperience(
    userId: string,
    experienceDto: CreateExperienceDto,
  ): Promise<ExperienceResponseDto> {
    const experience =
      await this.experienceRepository.create(
        new Types.ObjectId(userId),
        experienceDto,
      );

    return this.mapToResponse(experience);
  }

  /**
   * Get All Experiences
   */
  public async getExperiences(
    userId: string,
  ): Promise<ExperienceResponseDto[]> {
    const experiences =
      await this.experienceRepository.findAllByUserId(
        new Types.ObjectId(userId),
      );

    return experiences.map((experience) =>
      this.mapToResponse(experience),
    );
  }

  /**
   * Get Experience By ID
   */
  public async getExperienceById(
    experienceId: string,
    userId: string,
  ): Promise<ExperienceResponseDto> {
    const experience =
      await this.experienceRepository.findByIdAndUserId(
        new Types.ObjectId(experienceId),
        new Types.ObjectId(userId),
      );

    if (!experience) {
      throw new NotFoundException(
        'Experience not found.',
      );
    }

    return this.mapToResponse(experience);
  }

  /**
   * Update Experience
   */
  public async updateExperience(
    experienceId: string,
    userId: string,
    experienceDto: UpdateExperienceDto,
  ): Promise<ExperienceResponseDto> {
    const experience =
      await this.experienceRepository.update(
        new Types.ObjectId(experienceId),
        new Types.ObjectId(userId),
        experienceDto,
      );

    if (!experience) {
      throw new NotFoundException(
        'Experience not found.',
      );
    }

    return this.mapToResponse(experience);
  }

  /**
   * Delete Experience
   */
  public async deleteExperience(
    experienceId: string,
    userId: string,
  ): Promise<void> {
    const experience =
      await this.experienceRepository.delete(
        new Types.ObjectId(experienceId),
        new Types.ObjectId(userId),
      );

    if (!experience) {
      throw new NotFoundException(
        'Experience not found.',
      );
    }
  }
}