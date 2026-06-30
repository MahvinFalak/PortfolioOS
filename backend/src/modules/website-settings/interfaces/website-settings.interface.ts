import { Document, Types } from 'mongoose';

export interface WebsiteSettingsDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  siteName: string;
  siteUrl?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  ogImage?: string;
  contactEmail: string;
  contactPhone?: string;
  contactLocation?: string;
  heroTitle: string;
  heroSubtitle: string;
  featuredProjectLimit: number;
  featuredSkillLimit: number;
  allowResumeDownload: boolean;
  maintenanceMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}