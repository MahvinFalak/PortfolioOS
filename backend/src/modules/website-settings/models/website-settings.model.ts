import { model, Schema } from 'mongoose';

import { WebsiteSettingsDocument } from '../interfaces/website-settings.interface';

const websiteSettingsSchema = new Schema<WebsiteSettingsDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    siteName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    siteUrl: {
      type: String,
      trim: true,
    },
    seoTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    seoDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    seoKeywords: {
      type: [String],
      required: true,
      default: [],
    },
    ogImage: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },
    contactPhone: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    contactLocation: {
      type: String,
      trim: true,
      maxlength: 150,
    },
    heroTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    heroSubtitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    featuredProjectLimit: {
      type: Number,
      required: true,
      default: 3,
      min: 0,
    },
    featuredSkillLimit: {
      type: Number,
      required: true,
      default: 8,
      min: 0,
    },
    allowResumeDownload: {
      type: Boolean,
      required: true,
      default: true,
    },
    maintenanceMode: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

websiteSettingsSchema.index({
  siteName: 'text',
  seoTitle: 'text',
  seoDescription: 'text',
});

export const WebsiteSettingsModel = model<WebsiteSettingsDocument>(
  'WebsiteSettings',
  websiteSettingsSchema,
);