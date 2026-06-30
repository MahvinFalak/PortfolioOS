import { Document, Types } from 'mongoose';

export interface SocialLinks {
  github?: string;

  linkedin?: string;

  twitter?: string;

  website?: string;
}

export interface ProfileDocument extends Document {
  _id: Types.ObjectId;

  userId: Types.ObjectId;

  firstName: string;

  lastName: string;

  headline?: string;

  about?: string;

  profileImage?: string;

  resumeUrl?: string;

  phone?: string;

  location?: string;

  socialLinks: SocialLinks;

  createdAt: Date;

  updatedAt: Date;
}