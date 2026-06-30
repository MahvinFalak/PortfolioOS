import { Schema, model } from 'mongoose';

import {
  EmploymentType,
  ExperienceDocument,
  LocationType,
} from '../interfaces/experience.interface';

const experienceSchema = new Schema<ExperienceDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: Object.values(EmploymentType),
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    locationType: {
      type: String,
      enum: Object.values(LocationType),
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    isCurrent: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      trim: true,
    },

    technologies: {
      type: [String],
      default: [],
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

experienceSchema.index({
  userId: 1,
  displayOrder: 1,
});

export const Experience = model<ExperienceDocument>(
  'Experience',
  experienceSchema,
);