import { Types } from 'mongoose';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';

import {
  AdminDashboardRecentActivityDto,
  AdminDashboardResponseDto,
  AdminDashboardSummaryDto,
} from '../dto/admin-dashboard.dto';
import {
  AdminDashboardRecentActivity,
  AdminDashboardSummary,
} from '../interfaces/admin-dashboard.interface';
import { AdminDashboardRepository } from '../repositories/admin-dashboard.repository';

export class AdminDashboardService {
  private readonly adminDashboardRepository = new AdminDashboardRepository();

  async getSummary(userId: string): Promise<AdminDashboardResponseDto> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    const summary = await this.adminDashboardRepository.getSummary(
      userObjectId,
    );

    const recentActivities = this.buildRecentActivities(summary);

    return {
      summary: this.mapSummaryToDto(summary),
      recentActivities: recentActivities.map((activity) =>
        this.mapRecentActivityToDto(activity),
      ),
      generatedAt: new Date(),
    };
  }

  private toObjectId(value: string, fieldName: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${fieldName} is invalid.`);
    }

    return new Types.ObjectId(value);
  }

  private buildRecentActivities(
    summary: AdminDashboardSummary,
  ): AdminDashboardRecentActivity[] {
    const generatedAt = new Date();

    return [
      {
        module: 'Projects',
        action: 'SUMMARY',
        message: `${summary.totalProjects} project(s) available.`,
        timestamp: generatedAt,
      },
      {
        module: 'Skills',
        action: 'SUMMARY',
        message: `${summary.totalSkills} skill(s) available.`,
        timestamp: generatedAt,
      },
      {
        module: 'Resume',
        action: 'SUMMARY',
        message: summary.activeResumeAvailable
          ? 'Active resume is available.'
          : 'Active resume is not available.',
        timestamp: generatedAt,
      },
      {
        module: 'Website Settings',
        action: 'SUMMARY',
        message: summary.websiteSettingsCompleted
          ? 'Website settings are configured.'
          : 'Website settings are not configured.',
        timestamp: generatedAt,
      },
    ];
  }

  private mapSummaryToDto(
    summary: AdminDashboardSummary,
  ): AdminDashboardSummaryDto {
    return {
      profileCompleted: summary.profileCompleted,
      totalSkills: summary.totalSkills,
      featuredSkills: summary.featuredSkills,
      totalExperiences: summary.totalExperiences,
      totalProjects: summary.totalProjects,
      featuredProjects: summary.featuredProjects,
      totalResumes: summary.totalResumes,
      activeResumeAvailable: summary.activeResumeAvailable,
      totalCertifications: summary.totalCertifications,
      totalSocialLinks: summary.totalSocialLinks,
      visibleSocialLinks: summary.visibleSocialLinks,
      totalEducationRecords: summary.totalEducationRecords,
      totalAchievements: summary.totalAchievements,
      featuredAchievements: summary.featuredAchievements,
      websiteSettingsCompleted: summary.websiteSettingsCompleted,
    };
  }

  private mapRecentActivityToDto(
    activity: AdminDashboardRecentActivity,
  ): AdminDashboardRecentActivityDto {
    return {
      module: activity.module,
      action: activity.action,
      message: activity.message,
      timestamp: activity.timestamp,
    };
  }
}