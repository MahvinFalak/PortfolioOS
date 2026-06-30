import { model, Schema } from 'mongoose';

import { AchievementDocument } from '../interfaces/achievement.interface';

const achievementSchema = new Schema<AchievementDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      index: true,
    },
    issuer: {
      type: String,
      trim: true,
      maxlength: 150,
    },
    achievementDate: {
      type: Date,
      required: true,
      index: true,
    },
    url: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
    displayOrder: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

achievementSchema.index({ userId: 1, displayOrder: 1 });
achievementSchema.index({ userId: 1, featured: 1 });
achievementSchema.index({ userId: 1, category: 1 });
achievementSchema.index({ userId: 1, achievementDate: -1 });
achievementSchema.index({
  title: 'text',
  description: 'text',
  category: 'text',
  issuer: 'text',
});

export const AchievementModel = model<AchievementDocument>(
  'Achievement',
  achievementSchema,
);