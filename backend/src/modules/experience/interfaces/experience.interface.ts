import { Document, Types } from 'mongoose';

export enum EmploymentType {
  FULL_TIME = 'Full Time',

  PART_TIME = 'Part Time',

  CONTRACT = 'Contract',

  INTERNSHIP = 'Internship',

  FREELANCE = 'Freelance',

  TEMPORARY = 'Temporary',
}

export enum LocationType {
  ONSITE = 'Onsite',

  REMOTE = 'Remote',

  HYBRID = 'Hybrid',
}

export interface ExperienceDocument extends Document {
  _id: Types.ObjectId;

  userId: Types.ObjectId;

  company: string;

  position: string;

  employmentType: EmploymentType;

  location: string;

  locationType: LocationType;

  startDate: Date;

  endDate?: Date;

  isCurrent: boolean;

  description?: string;

  technologies: string[];

  displayOrder: number;

  createdAt: Date;

  updatedAt: Date;
}
