export interface CreateResumeDto {
  version: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt?: Date;
  active?: boolean;
}

export interface UpdateResumeDto {
  version?: string;
  fileName?: string;
  fileUrl?: string;
  fileSize?: number;
  uploadedAt?: Date;
  active?: boolean;
}

export interface ResumeResponseDto {
  id: string;
  userId: string;
  version: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}