import { Document, Types } from 'mongoose';

export interface EducationDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  currentlyStudying: boolean;
  grade?: string;
  description?: string;
  achievements: string[];
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}