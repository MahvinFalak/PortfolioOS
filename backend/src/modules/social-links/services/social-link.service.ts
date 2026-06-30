import { Types } from 'mongoose';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';
import { ConflictException } from '../../../app/exceptions/conflict.exception';
import { NotFoundException } from '../../../app/exceptions/not-found.exception';

import {
  CreateSocialLinkDto,
  SocialLinkResponseDto,
  UpdateSocialLinkDto,
} from '../dto/social-link.dto';
import { SocialLinkDocument } from '../interfaces/social-link.interface';
import { SocialLinkRepository } from '../repositories/social-link.repository';

export class SocialLinkService {
  private readonly socialLinkRepository = new SocialLinkRepository();

  async create(
    userId: string,
    dto: CreateSocialLinkDto,
  ): Promise<SocialLinkResponseDto> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    const existingSocialLink =
      await this.socialLinkRepository.findByPlatformAndUserId(
        dto.platform,
        userObjectId,
      );

    if (existingSocialLink) {
      throw new ConflictException('Social link platform already exists.');
    }

    const socialLink = await this.socialLinkRepository.create(
      userObjectId,
      dto,
    );

    return this.mapToResponse(socialLink);
  }

  async getAll(userId: string): Promise<SocialLinkResponseDto[]> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    const socialLinks =
      await this.socialLinkRepository.findAllByUserId(userObjectId);

    return socialLinks.map((socialLink) => this.mapToResponse(socialLink));
  }

  async getById(id: string, userId: string): Promise<SocialLinkResponseDto> {
    const socialLinkObjectId = this.toObjectId(id, 'Social Link ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const socialLink = await this.socialLinkRepository.findByIdAndUserId(
      socialLinkObjectId,
      userObjectId,
    );

    if (!socialLink) {
      throw new NotFoundException('Social link not found.');
    }

    return this.mapToResponse(socialLink);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateSocialLinkDto,
  ): Promise<SocialLinkResponseDto> {
    const socialLinkObjectId = this.toObjectId(id, 'Social Link ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    if (dto.platform) {
      const existingSocialLink =
        await this.socialLinkRepository.findByPlatformAndUserId(
          dto.platform,
          userObjectId,
          socialLinkObjectId,
        );

      if (existingSocialLink) {
        throw new ConflictException('Social link platform already exists.');
      }
    }

    const socialLink = await this.socialLinkRepository.update(
      socialLinkObjectId,
      userObjectId,
      dto,
    );

    if (!socialLink) {
      throw new NotFoundException('Social link not found.');
    }

    return this.mapToResponse(socialLink);
  }

  async delete(id: string, userId: string): Promise<void> {
    const socialLinkObjectId = this.toObjectId(id, 'Social Link ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const socialLink = await this.socialLinkRepository.delete(
      socialLinkObjectId,
      userObjectId,
    );

    if (!socialLink) {
      throw new NotFoundException('Social link not found.');
    }
  }

  private toObjectId(value: string, fieldName: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${fieldName} is invalid.`);
    }

    return new Types.ObjectId(value);
  }

  private mapToResponse(socialLink: SocialLinkDocument): SocialLinkResponseDto {
    return {
      id: socialLink._id.toString(),
      userId: socialLink.userId.toString(),
      platform: socialLink.platform,
      username: socialLink.username,
      url: socialLink.url,
      icon: socialLink.icon,
      displayOrder: socialLink.displayOrder,
      visible: socialLink.visible,
      createdAt: socialLink.createdAt,
      updatedAt: socialLink.updatedAt,
    };
  }
}