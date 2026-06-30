export interface AdminDashboardSummaryDto {
  profileCompleted: boolean;
  totalSkills: number;
  featuredSkills: number;
  totalExperiences: number;
  totalProjects: number;
  featuredProjects: number;
  totalResumes: number;
  activeResumeAvailable: boolean;
  totalCertifications: number;
  totalSocialLinks: number;
  visibleSocialLinks: number;
  totalEducationRecords: number;
  totalAchievements: number;
  featuredAchievements: number;
  websiteSettingsCompleted: boolean;
}

export interface AdminDashboardRecentActivityDto {
  module: string;
  action: string;
  message: string;
  timestamp: Date;
}

export interface AdminDashboardResponseDto {
  summary: AdminDashboardSummaryDto;
  recentActivities: AdminDashboardRecentActivityDto[];
  generatedAt: Date;
}