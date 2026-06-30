import { Document, Types } from 'mongoose';

export interface ProjectDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  projectType: string;
  featured: boolean;
  technologies: Types.ObjectId[];
  images: string[];
  thumbnail: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  architectureDiagram?: string;
  challenges: string[];
  solutions: string[];
  lessonsLearned: string[];
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}