export interface CreateSocialLinkDto {
  platform: string;
  username: string;
  url: string;
  icon: string;
  displayOrder?: number;
  visible?: boolean;
}

export interface UpdateSocialLinkDto {
  platform?: string;
  username?: string;
  url?: string;
  icon?: string;
  displayOrder?: number;
  visible?: boolean;
}

export interface SocialLinkResponseDto {
  id: string;
  userId: string;
  platform: string;
  username: string;
  url: string;
  icon: string;
  displayOrder: number;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
}