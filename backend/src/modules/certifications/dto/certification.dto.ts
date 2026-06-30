export interface CreateCertificationDto {
  title: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  displayOrder?: number;
}

export interface UpdateCertificationDto {
  title?: string;
  issuer?: string;
  issueDate?: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  displayOrder?: number;
}

export interface CertificationResponseDto {
  id: string;
  userId: string;
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