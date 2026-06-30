export interface CreateAchievementDto {
  title: string;
  description: string;
  category: string;
  issuer?: string;
  achievementDate: Date;
  url?: string;
  image?: string;
  featured?: boolean;
  displayOrder?: number;
}

export interface UpdateAchievementDto {
  title?: string;
  description?: string;
  category?: string;
  issuer?: string;
  achievementDate?: Date;
  url?: string;
  image?: string;
  featured?: boolean;
  displayOrder?: number;
}

export interface AchievementResponseDto {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  issuer?: string;
  achievementDate: Date;
  url?: string;
  image?: string;
  featured: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}