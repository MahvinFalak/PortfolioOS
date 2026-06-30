import { model, Schema } from 'mongoose';

import { EducationDocument } from '../interfaces/education.interface';

const educationSchema = new Schema<EducationDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    institution: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    fieldOfStudy: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 150,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    currentlyStudying: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
    grade: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    achievements: {
      type: [String],
      required: true,
      default: [],
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

educationSchema.index({ userId: 1, displayOrder: 1 });
educationSchema.index({ userId: 1, startDate: -1 });
educationSchema.index({ userId: 1, currentlyStudying: 1 });
educationSchema.index({
  institution: 'text',
  degree: 'text',
  fieldOfStudy: 'text',
});

export const EducationModel = model<EducationDocument>(
  'Education',
  educationSchema,
);