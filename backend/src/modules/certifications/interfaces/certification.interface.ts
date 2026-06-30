import { Document, Types } from 'mongoose';

export interface CertificationDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}