import { Types } from 'mongoose';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';
import { ConflictException } from '../../../app/exceptions/conflict.exception';
import { NotFoundException } from '../../../app/exceptions/not-found.exception';

import {
  CreateWebsiteSettingsDto,
  UpdateWebsiteSettingsDto,
  WebsiteSettingsResponseDto,
} from '../dto/website-settings.dto';
import { WebsiteSettingsDocument } from '../interfaces/website-settings.interface';
import { WebsiteSettingsRepository } from '../repositories/website-settings.repository';

export class WebsiteSettingsService {
  private readonly websiteSettingsRepository =
    new WebsiteSettingsRepository();

  async create(
    userId: string,
    dto: CreateWebsiteSettingsDto,
  ): Promise<WebsiteSettingsResponseDto> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    const existingSettings =
      await this.websiteSettingsRepository.findByUserId(userObjectId);

    if (existingSettings) {
      throw new ConflictException('Website settings already exist.');
    }

    const settings = await this.websiteSettingsRepository.create(
      userObjectId,
      dto,
    );

    return this.mapToResponse(settings);
  }

  async get(userId: string): Promise<WebsiteSettingsResponseDto> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    const settings =
      await this.websiteSettingsRepository.findByUserId(userObjectId);

    if (!settings) {
      throw new NotFoundException('Website settings not found.');
    }

    return this.mapToResponse(settings);
  }

  async update(
    userId: string,
    dto: UpdateWebsiteSettingsDto,
  ): Promise<WebsiteSettingsResponseDto> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    const settings = await this.websiteSettingsRepository.update(
      userObjectId,
      dto,
    );

    if (!settings) {
      throw new NotFoundException('Website settings not found.');
    }

    return this.mapToResponse(settings);
  }

  private toObjectId(value: string, fieldName: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${fieldName} is invalid.`);
    }

    return new Types.ObjectId(value);
  }

  private mapToResponse(
    settings: WebsiteSettingsDocument,
  ): WebsiteSettingsResponseDto {
    return {
      id: settings._id.toString(),
      userId: settings.userId.toString(),
      siteName: settings.siteName,
      siteUrl: settings.siteUrl,
      seoTitle: settings.seoTitle,
      seoDescription: settings.seoDescription,
      seoKeywords: settings.seoKeywords,
      ogImage: settings.ogImage,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      contactLocation: settings.contactLocation,
      heroTitle: settings.heroTitle,
      heroSubtitle: settings.heroSubtitle,
      featuredProjectLimit: settings.featuredProjectLimit,
      featuredSkillLimit: settings.featuredSkillLimit,
      allowResumeDownload: settings.allowResumeDownload,
      maintenanceMode: settings.maintenanceMode,
      createdAt: settings.createdAt,
      updatedAt: settings.updatedAt,
    };
  }
}