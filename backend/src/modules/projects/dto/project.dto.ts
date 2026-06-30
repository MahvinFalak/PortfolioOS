export interface CreateProjectDto {
  title: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  projectType: string;
  featured: boolean;
  technologies: string[];
  images: string[];
  thumbnail: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  architectureDiagram?: string;
  challenges: string[];
  solutions: string[];
  lessonsLearned: string[];
  displayOrder: number;
}

export interface UpdateProjectDto {
  title?: string;
  slug?: string;
  shortDescription?: string;
  detailedDescription?: string;
  projectType?: string;
  featured?: boolean;
  technologies?: string[];
  images?: string[];
  thumbnail?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  architectureDiagram?: string;
  challenges?: string[];
  solutions?: string[];
  lessonsLearned?: string[];
  displayOrder?: number;
}

export interface ProjectResponseDto {
  id: string;
  userId: string;
  title: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  projectType: string;
  featured: boolean;
  technologies: string[];
  images: string[];
  thumbnail: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  architectureDiagram?: string;
  challenges: string[];
  solutions: string[];
  lessonsLearned: string[];
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}