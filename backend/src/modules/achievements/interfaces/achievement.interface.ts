import { Document, Types } from 'mongoose';

export interface AchievementDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  issuer?: string;
  achievementDate: Date;
  url?: string;
  image?: string;
  featured: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}