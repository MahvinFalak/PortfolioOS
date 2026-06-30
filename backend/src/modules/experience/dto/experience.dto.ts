import {
  EmploymentType,
  LocationType,
} from '../interfaces/experience.interface';

export interface CreateExperienceDto {
  company: string;

  position: string;

  employmentType: EmploymentType;

  location: string;

  locationType: LocationType;

  startDate: Date;

  endDate?: Date;

  isCurrent?: boolean;

  description?: string;

  technologies?: string[];

  displayOrder?: number;
}

export interface UpdateExperienceDto {
  company?: string;

  position?: string;

  employmentType?: EmploymentType;

  location?: string;

  locationType?: LocationType;

  startDate?: Date;

  endDate?: Date;

  isCurrent?: boolean;

  description?: string;

  technologies?: string[];

  displayOrder?: number;
}

export interface ExperienceResponseDto {
  id: string;

  userId: string;

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
