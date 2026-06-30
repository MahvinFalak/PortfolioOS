import { model, Schema } from 'mongoose';

import { CertificationDocument } from '../interfaces/certification.interface';

const certificationSchema = new Schema<CertificationDocument>(
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
    issuer: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
    },
    credentialId: {
      type: String,
      trim: true,
      maxlength: 150,
    },
    credentialUrl: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
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

certificationSchema.index({ userId: 1, displayOrder: 1 });
certificationSchema.index({ userId: 1, issuer: 1 });
certificationSchema.index({
  title: 'text',
  issuer: 'text',
  credentialId: 'text',
});

export const CertificationModel = model<CertificationDocument>(
  'Certification',
  certificationSchema,
);