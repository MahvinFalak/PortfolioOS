import { model, Schema } from 'mongoose';

import { SocialLinkDocument } from '../interfaces/social-link.interface';

const socialLinkSchema = new Schema<SocialLinkDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    platform: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    displayOrder: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      index: true,
    },
    visible: {
      type: Boolean,
      required: true,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

socialLinkSchema.index({ userId: 1, platform: 1 }, { unique: true });
socialLinkSchema.index({ userId: 1, displayOrder: 1 });
socialLinkSchema.index({ userId: 1, visible: 1 });
socialLinkSchema.index({
  platform: 'text',
  username: 'text',
});

export const SocialLinkModel = model<SocialLinkDocument>(
  'SocialLink',
  socialLinkSchema,
);