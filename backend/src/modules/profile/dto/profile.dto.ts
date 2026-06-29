export interface SocialLinksDto {
  github?: string;

  linkedin?: string;

  twitter?: string;

  website?: string;
}

export interface CreateProfileDto {
  firstName: string;

  lastName: string;

  headline?: string;

  about?: string;

  profileImage?: string;

  resumeUrl?: string;

  phone?: string;

  location?: string;

  socialLinks?: SocialLinksDto;
}

export interface UpdateProfileDto {
  firstName?: string;

  lastName?: string;

  headline?: string;

  about?: string;

  profileImage?: string;

  resumeUrl?: string;

  phone?: string;

  location?: string;

  socialLinks?: SocialLinksDto;
}

export interface ProfileResponseDto {
  id: string;

  userId: string;

  firstName: string;

  lastName: string;

  headline?: string;

  about?: string;

  profileImage?: string;

  resumeUrl?: string;

  phone?: string;

  location?: string;

  socialLinks: SocialLinksDto;

  createdAt: Date;

  updatedAt: Date;
}