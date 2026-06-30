import { SkillCategory } from '../interfaces/skill.interface';

export interface CreateSkillDto {
  name: string;

  category: SkillCategory;

  proficiency: number;

  icon?: string;

  displayOrder?: number;
}

export interface UpdateSkillDto {
  name?: string;

  category?: SkillCategory;

  proficiency?: number;

  icon?: string;

  displayOrder?: number;
}

export interface SkillResponseDto {
  id: string;

  userId: string;

  name: string;

  category: SkillCategory;

  proficiency: number;

  icon?: string;

  displayOrder: number;

  createdAt: Date;

  updatedAt: Date;
}
