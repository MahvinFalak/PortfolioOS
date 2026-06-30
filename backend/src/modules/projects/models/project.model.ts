import { model, Schema } from 'mongoose';

import { ProjectDocument } from '../interfaces/project.interface';

const projectSchema = new Schema<ProjectDocument>(
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
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 300,
    },
    detailedDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    projectType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    featured: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
    technologies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Skill',
        required: true,
      },
    ],
    images: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    liveDemoUrl: {
      type: String,
      trim: true,
    },
    architectureDiagram: {
      type: String,
      trim: true,
    },
    challenges: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    solutions: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    lessonsLearned: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
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

projectSchema.index({ userId: 1, slug: 1 }, { unique: true });
projectSchema.index({ userId: 1, displayOrder: 1 });
projectSchema.index({ userId: 1, featured: 1 });
projectSchema.index({
  title: 'text',
  shortDescription: 'text',
  detailedDescription: 'text',
});

export const ProjectModel = model<ProjectDocument>('Project', projectSchema);