import { Types } from 'mongoose';

import {
  CreateWebsiteSettingsDto,
  UpdateWebsiteSettingsDto,
} from '../dto/website-settings.dto';
import { WebsiteSettingsDocument } from '../interfaces/website-settings.interface';
import { WebsiteSettingsModel } from '../models/website-settings.model';

export class WebsiteSettingsRepository {
  async create(
    userId: Types.ObjectId,
    dto: CreateWebsiteSettingsDto,
  ): Promise<WebsiteSettingsDocument> {
    return WebsiteSettingsModel.create({
      ...dto,
      userId,
    });
  }

  async findByUserId(
    userId: Types.ObjectId,
  ): Promise<WebsiteSettingsDocument | null> {
    return WebsiteSettingsModel.findOne({
      userId,
    }).exec();
  }

  async update(
    userId: Types.ObjectId,
    dto: UpdateWebsiteSettingsDto,
  ): Promise<WebsiteSettingsDocument | null> {
    return WebsiteSettingsModel.findOneAndUpdate(
      {
        userId,
      },
      {
        $set: dto,
      },
      {
        new: true,
        runValidators: true,
      },
    ).exec();
  }
}