import { Types } from 'mongoose';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';
import { NotFoundException } from '../../../app/exceptions/not-found.exception';

import {
  CreateResumeDto,
  ResumeResponseDto,
  UpdateResumeDto,
} from '../dto/resume.dto';
import { ResumeDocument } from '../interfaces/resume.interface';
import { ResumeRepository } from '../repositories/resume.repository';

export class ResumeService {
  private readonly resumeRepository = new ResumeRepository();

  async create(
    userId: string,
    dto: CreateResumeDto,
  ): Promise<ResumeResponseDto> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    if (dto.active !== false) {
      await this.resumeRepository.deactivateActiveByUserId(userObjectId);
    }

    const resume = await this.resumeRepository.create(userObjectId, {
      ...dto,
      active: dto.active ?? true,
      uploadedAt: dto.uploadedAt ?? new Date(),
    });

    return this.mapToResponse(resume);
  }

  async getActive(userId: string): Promise<ResumeResponseDto> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    const resume =
      await this.resumeRepository.findActiveByUserId(userObjectId);

    if (!resume) {
      throw new NotFoundException('Active resume not found.');
    }

    return this.mapToResponse(resume);
  }

  async getAll(userId: string): Promise<ResumeResponseDto[]> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    const resumes =
      await this.resumeRepository.findAllByUserId(userObjectId);

    return resumes.map((resume) => this.mapToResponse(resume));
  }

  async getById(
    id: string,
    userId: string,
  ): Promise<ResumeResponseDto> {
    const resumeObjectId = this.toObjectId(id, 'Resume ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const resume = await this.resumeRepository.findByIdAndUserId(
      resumeObjectId,
      userObjectId,
    );

    if (!resume) {
      throw new NotFoundException('Resume not found.');
    }

    return this.mapToResponse(resume);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateResumeDto,
  ): Promise<ResumeResponseDto> {
    const resumeObjectId = this.toObjectId(id, 'Resume ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    if (dto.active === true) {
      await this.resumeRepository.deactivateActiveByUserId(userObjectId);
    }

    const resume = await this.resumeRepository.update(
      resumeObjectId,
      userObjectId,
      dto,
    );

    if (!resume) {
      throw new NotFoundException('Resume not found.');
    }

    return this.mapToResponse(resume);
  }

  async delete(id: string, userId: string): Promise<void> {
    const resumeObjectId = this.toObjectId(id, 'Resume ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const resume = await this.resumeRepository.delete(
      resumeObjectId,
      userObjectId,
    );

    if (!resume) {
      throw new NotFoundException('Resume not found.');
    }
  }

  private toObjectId(value: string, fieldName: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${fieldName} is invalid.`);
    }

    return new Types.ObjectId(value);
  }

  private mapToResponse(resume: ResumeDocument): ResumeResponseDto {
    return {
      id: resume._id.toString(),
      userId: resume.userId.toString(),
      version: resume.version,
      fileName: resume.fileName,
      fileUrl: resume.fileUrl,
      fileSize: resume.fileSize,
      uploadedAt: resume.uploadedAt,
      active: resume.active,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  }
}