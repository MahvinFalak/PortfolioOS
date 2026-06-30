import { Document, Types } from 'mongoose';

export interface ResumeDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  version: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}