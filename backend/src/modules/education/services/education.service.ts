import { Types } from 'mongoose';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';
import { NotFoundException } from '../../../app/exceptions/not-found.exception';

import {
  CreateEducationDto,
  EducationResponseDto,
  UpdateEducationDto,
} from '../dto/education.dto';
import { EducationDocument } from '../interfaces/education.interface';
import { EducationRepository } from '../repositories/education.repository';

export class EducationService {
  private readonly educationRepository = new EducationRepository();

  async create(
    userId: string,
    dto: CreateEducationDto,
  ): Promise<EducationResponseDto> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    this.validateEducationDates(
      dto.startDate,
      dto.endDate,
      dto.currentlyStudying ?? false,
    );

    const education = await this.educationRepository.create(userObjectId, dto);

    return this.mapToResponse(education);
  }

  async getAll(userId: string): Promise<EducationResponseDto[]> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    const educationList =
      await this.educationRepository.findAllByUserId(userObjectId);

    return educationList.map((education) => this.mapToResponse(education));
  }

  async getById(id: string, userId: string): Promise<EducationResponseDto> {
    const educationObjectId = this.toObjectId(id, 'Education ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const education = await this.educationRepository.findByIdAndUserId(
      educationObjectId,
      userObjectId,
    );

    if (!education) {
      throw new NotFoundException('Education record not found.');
    }

    return this.mapToResponse(education);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateEducationDto,
  ): Promise<EducationResponseDto> {
    const educationObjectId = this.toObjectId(id, 'Education ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const existingEducation =
      await this.educationRepository.findByIdAndUserId(
        educationObjectId,
        userObjectId,
      );

    if (!existingEducation) {
      throw new NotFoundException('Education record not found.');
    }

    const startDate = dto.startDate ?? existingEducation.startDate;
    const endDate = dto.endDate ?? existingEducation.endDate;
    const currentlyStudying =
      dto.currentlyStudying ?? existingEducation.currentlyStudying;

    this.validateEducationDates(startDate, endDate, currentlyStudying);

    const education = await this.educationRepository.update(
      educationObjectId,
      userObjectId,
      dto,
    );

    if (!education) {
      throw new NotFoundException('Education record not found.');
    }

    return this.mapToResponse(education);
  }

  async delete(id: string, userId: string): Promise<void> {
    const educationObjectId = this.toObjectId(id, 'Education ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const education = await this.educationRepository.delete(
      educationObjectId,
      userObjectId,
    );

    if (!education) {
      throw new NotFoundException('Education record not found.');
    }
  }

  private toObjectId(value: string, fieldName: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${fieldName} is invalid.`);
    }

    return new Types.ObjectId(value);
  }

  private validateEducationDates(
    startDate: Date,
    endDate: Date | undefined,
    currentlyStudying: boolean,
  ): void {
    if (!currentlyStudying && !endDate) {
      throw new BadRequestException(
        'End date is required when currently studying is false.',
      );
    }

    if (endDate && endDate < startDate) {
      throw new BadRequestException(
        'End date cannot be earlier than start date.',
      );
    }
  }

  private mapToResponse(education: EducationDocument): EducationResponseDto {
    return {
      id: education._id.toString(),
      userId: education.userId.toString(),
      institution: education.institution,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy,
      location: education.location,
      startDate: education.startDate,
      endDate: education.endDate,
      currentlyStudying: education.currentlyStudying,
      grade: education.grade,
      description: education.description,
      achievements: education.achievements,
      displayOrder: education.displayOrder,
      createdAt: education.createdAt,
      updatedAt: education.updatedAt,
    };
  }
}