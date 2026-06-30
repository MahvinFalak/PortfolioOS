import { Document, Types } from 'mongoose';

export interface SocialLinkDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  platform: string;
  username: string;
  url: string;
  icon: string;
  displayOrder: number;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
}