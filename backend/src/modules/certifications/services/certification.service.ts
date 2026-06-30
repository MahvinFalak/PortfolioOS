import { Types } from 'mongoose';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';
import { NotFoundException } from '../../../app/exceptions/not-found.exception';

import {
  CertificationResponseDto,
  CreateCertificationDto,
  UpdateCertificationDto,
} from '../dto/certification.dto';
import { CertificationDocument } from '../interfaces/certification.interface';
import { CertificationRepository } from '../repositories/certification.repository';

export class CertificationService {
  private readonly certificationRepository = new CertificationRepository();

  async create(
    userId: string,
    dto: CreateCertificationDto,
  ): Promise<CertificationResponseDto> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    const certification = await this.certificationRepository.create(
      userObjectId,
      dto,
    );

    return this.mapToResponse(certification);
  }

  async getAll(userId: string): Promise<CertificationResponseDto[]> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    const certifications =
      await this.certificationRepository.findAllByUserId(userObjectId);

    return certifications.map((certification) =>
      this.mapToResponse(certification),
    );
  }

  async getById(
    id: string,
    userId: string,
  ): Promise<CertificationResponseDto> {
    const certificationObjectId = this.toObjectId(id, 'Certification ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const certification =
      await this.certificationRepository.findByIdAndUserId(
        certificationObjectId,
        userObjectId,
      );

    if (!certification) {
      throw new NotFoundException('Certification not found.');
    }

    return this.mapToResponse(certification);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateCertificationDto,
  ): Promise<CertificationResponseDto> {
    const certificationObjectId = this.toObjectId(id, 'Certification ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const certification = await this.certificationRepository.update(
      certificationObjectId,
      userObjectId,
      dto,
    );

    if (!certification) {
      throw new NotFoundException('Certification not found.');
    }

    return this.mapToResponse(certification);
  }

  async delete(id: string, userId: string): Promise<void> {
    const certificationObjectId = this.toObjectId(id, 'Certification ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const certification = await this.certificationRepository.delete(
      certificationObjectId,
      userObjectId,
    );

    if (!certification) {
      throw new NotFoundException('Certification not found.');
    }
  }

  private toObjectId(value: string, fieldName: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${fieldName} is invalid.`);
    }

    return new Types.ObjectId(value);
  }

  private mapToResponse(
    certification: CertificationDocument,
  ): CertificationResponseDto {
    return {
      id: certification._id.toString(),
      userId: certification.userId.toString(),
      title: certification.title,
      issuer: certification.issuer,
      issueDate: certification.issueDate,
      expiryDate: certification.expiryDate,
      credentialId: certification.credentialId,
      credentialUrl: certification.credentialUrl,
      image: certification.image,
      displayOrder: certification.displayOrder,
      createdAt: certification.createdAt,
      updatedAt: certification.updatedAt,
    };
  }
}