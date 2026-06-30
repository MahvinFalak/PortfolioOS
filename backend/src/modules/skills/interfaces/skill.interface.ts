import { Document, Types } from 'mongoose';

export enum SkillCategory {
  FRONTEND = 'Frontend',

  BACKEND = 'Backend',

  DATABASE = 'Database',

  DEVOPS = 'DevOps',

  CLOUD = 'Cloud',

  PROGRAMMING_LANGUAGE = 'Programming Language',

  TOOLS = 'Tools',

  OTHER = 'Other',
}

export interface SkillDocument extends Document {
  _id: Types.ObjectId;

  userId: Types.ObjectId;

  name: string;

  category: SkillCategory;

  proficiency: number;

  icon?: string;

  displayOrder: number;

  createdAt: Date;

  updatedAt: Date;
}
