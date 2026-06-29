import { Schema, model } from 'mongoose';

import { ProfileDocument } from '../interfaces/profile.interface';

const profileSchema = new Schema<ProfileDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    headline: {
      type: String,
      trim: true,
    },

    about: {
      type: String,
      trim: true,
    },

    profileImage: {
      type: String,
      trim: true,
    },

    resumeUrl: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    socialLinks: {
      github: {
        type: String,
        trim: true,
      },

      linkedin: {
        type: String,
        trim: true,
      },

      twitter: {
        type: String,
        trim: true,
      },

      website: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Profile = model<ProfileDocument>(
  'Profile',
  profileSchema,
);