import { Types } from 'mongoose';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';
import { NotFoundException } from '../../../app/exceptions/not-found.exception';
import {
  CreateProjectDto,
  ProjectResponseDto,
  UpdateProjectDto,
} from '../dto/project.dto';
import { ProjectDocument } from '../interfaces/project.interface';
import { ProjectRepository } from '../repositories/project.repository';

export class ProjectService {
  private readonly projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  async create(
    userId: string,
    dto: CreateProjectDto,
  ): Promise<ProjectResponseDto> {
    const userObjectId = this.toObjectId(userId, 'User ID');
    const technologyIds = dto.technologies.map((technologyId) =>
      this.toObjectId(technologyId, 'Technology ID'),
    );

    const project = await this.projectRepository.create(userObjectId, {
      ...dto,
      technologies: technologyIds,
    });

    return this.mapToResponse(project);
  }

  async getAll(userId: string): Promise<ProjectResponseDto[]> {
    const userObjectId = this.toObjectId(userId, 'User ID');

    const projects = await this.projectRepository.findAllByUserId(userObjectId);

    return projects.map((project) => this.mapToResponse(project));
  }

  async getById(
    id: string,
    userId: string,
  ): Promise<ProjectResponseDto> {
    const projectObjectId = this.toObjectId(id, 'Project ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const project = await this.projectRepository.findByIdAndUserId(
      projectObjectId,
      userObjectId,
    );

    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    return this.mapToResponse(project);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateProjectDto,
  ): Promise<ProjectResponseDto> {
    const projectObjectId = this.toObjectId(id, 'Project ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const updateData = {
      ...dto,
      technologies: dto.technologies?.map((technologyId) =>
        this.toObjectId(technologyId, 'Technology ID'),
      ),
    };

    const project = await this.projectRepository.update(
      projectObjectId,
      userObjectId,
      updateData,
    );

    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    return this.mapToResponse(project);
  }

  async delete(
    id: string,
    userId: string,
  ): Promise<ProjectResponseDto> {
    const projectObjectId = this.toObjectId(id, 'Project ID');
    const userObjectId = this.toObjectId(userId, 'User ID');

    const project = await this.projectRepository.delete(
      projectObjectId,
      userObjectId,
    );

    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    return this.mapToResponse(project);
  }

  private toObjectId(value: string, fieldName: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${fieldName} is invalid.`);
    }

    return new Types.ObjectId(value);
  }

  private mapToResponse(project: ProjectDocument): ProjectResponseDto {
    return {
      id: project._id.toString(),
      userId: project.userId.toString(),
      title: project.title,
      slug: project.slug,
      shortDescription: project.shortDescription,
      detailedDescription: project.detailedDescription,
      projectType: project.projectType,
      featured: project.featured,
      technologies: project.technologies.map((technologyId) =>
        technologyId.toString(),
      ),
      images: project.images,
      thumbnail: project.thumbnail,
      githubUrl: project.githubUrl,
      liveDemoUrl: project.liveDemoUrl,
      architectureDiagram: project.architectureDiagram,
      challenges: project.challenges,
      solutions: project.solutions,
      lessonsLearned: project.lessonsLearned,
      displayOrder: project.displayOrder,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
}