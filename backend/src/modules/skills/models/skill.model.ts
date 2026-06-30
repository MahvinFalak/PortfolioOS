import { Schema, model } from 'mongoose';

import { SkillCategory, SkillDocument } from '../interfaces/skill.interface';

const skillSchema = new Schema<SkillDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: Object.values(SkillCategory),
      required: true,
    },

    proficiency: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    icon: {
      type: String,
      trim: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

skillSchema.index({
  userId: 1,
  displayOrder: 1,
});

export const Skill = model<SkillDocument>('Skill', skillSchema);
