import { Types } from 'mongoose';

import { AchievementModel } from '../../achievements/models/achievement.model';
import { CertificationModel } from '../../certifications/models/certification.model';
import { EducationModel } from '../../education/models/education.model';
import { Experience } from '../../experience/models/experience.model';
import { Profile } from '../../profile/models/profile.model';
import { ProjectModel } from '../../projects/models/project.model';
import { ResumeModel } from '../../resume/models/resume.model';
import { Skill } from '../../skills/models/skill.model';
import { SocialLinkModel } from '../../social-links/models/social-link.model';
import { WebsiteSettingsModel } from '../../website-settings/models/website-settings.model';

import { AdminDashboardSummary } from '../interfaces/admin-dashboard.interface';

export class AdminDashboardRepository {
  async getSummary(userId: Types.ObjectId): Promise<AdminDashboardSummary> {
    const [
      profileCount,
      totalSkills,
      featuredSkills,
      totalExperiences,
      totalProjects,
      featuredProjects,
      totalResumes,
      activeResumeCount,
      totalCertifications,
      totalSocialLinks,
      visibleSocialLinks,
      totalEducationRecords,
      totalAchievements,
      featuredAchievements,
      websiteSettingsCount,
    ] = await Promise.all([
      Profile.countDocuments({ userId }).exec(),
      Skill.countDocuments({ userId }).exec(),
      Skill.countDocuments({ userId, featured: true }).exec(),
      Experience.countDocuments({ userId }).exec(),
      ProjectModel.countDocuments({ userId }).exec(),
      ProjectModel.countDocuments({ userId, featured: true }).exec(),
      ResumeModel.countDocuments({ userId }).exec(),
      ResumeModel.countDocuments({ userId, active: true }).exec(),
      CertificationModel.countDocuments({ userId }).exec(),
      SocialLinkModel.countDocuments({ userId }).exec(),
      SocialLinkModel.countDocuments({ userId, visible: true }).exec(),
      EducationModel.countDocuments({ userId }).exec(),
      AchievementModel.countDocuments({ userId }).exec(),
      AchievementModel.countDocuments({ userId, featured: true }).exec(),
      WebsiteSettingsModel.countDocuments({ userId }).exec(),
    ]);

    return {
      profileCompleted: profileCount > 0,
      totalSkills,
      featuredSkills,
      totalExperiences,
      totalProjects,
      featuredProjects,
      totalResumes,
      activeResumeAvailable: activeResumeCount > 0,
      totalCertifications,
      totalSocialLinks,
      visibleSocialLinks,
      totalEducationRecords,
      totalAchievements,
      featuredAchievements,
      websiteSettingsCompleted: websiteSettingsCount > 0,
    };
  }
}