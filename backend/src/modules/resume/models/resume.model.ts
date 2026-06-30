import { model, Schema } from 'mongoose';

import { ResumeDocument } from '../interfaces/resume.interface';

const resumeSchema = new Schema<ResumeDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    version: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },
    fileSize: {
      type: Number,
      required: true,
      min: 1,
    },
    uploadedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    active: {
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

resumeSchema.index(
  { userId: 1, active: 1 },
  {
    unique: true,
    partialFilterExpression: {
      active: true,
    },
  },
);

resumeSchema.index({ userId: 1, uploadedAt: -1 });

export const ResumeModel = model<ResumeDocument>('Resume', resumeSchema);