export interface CreateWebsiteSettingsDto {
  siteName: string;
  siteUrl?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords?: string[];
  ogImage?: string;
  contactEmail: string;
  contactPhone?: string;
  contactLocation?: string;
  heroTitle: string;
  heroSubtitle: string;
  featuredProjectLimit?: number;
  featuredSkillLimit?: number;
  allowResumeDownload?: boolean;
  maintenanceMode?: boolean;
}

export interface UpdateWebsiteSettingsDto {
  siteName?: string;
  siteUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogImage?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactLocation?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  featuredProjectLimit?: number;
  featuredSkillLimit?: number;
  allowResumeDownload?: boolean;
  maintenanceMode?: boolean;
}

export interface WebsiteSettingsResponseDto {
  id: string;
  userId: string;
  siteName: string;
  siteUrl?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  ogImage?: string;
  contactEmail: string;
  contactPhone?: string;
  contactLocation?: string;
  heroTitle: string;
  heroSubtitle: string;
  featuredProjectLimit: number;
  featuredSkillLimit: number;
  allowResumeDownload: boolean;
  maintenanceMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}