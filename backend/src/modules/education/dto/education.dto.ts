export interface CreateEducationDto {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  currentlyStudying?: boolean;
  grade?: string;
  description?: string;
  achievements?: string[];
  displayOrder?: number;
}

export interface UpdateEducationDto {
  institution?: string;
  degree?: string;
  fieldOfStudy?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  currentlyStudying?: boolean;
  grade?: string;
  description?: string;
  achievements?: string[];
  displayOrder?: number;
}

export interface EducationResponseDto {
  id: string;
  userId: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  currentlyStudying: boolean;
  grade?: string;
  description?: string;
  achievements: string[];
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}