import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { BadRequestException } from '../../../app/exceptions/bad-request.exception';

import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';
import { ProjectService } from '../services/project.service';
import {
  createProjectSchema,
  updateProjectSchema,
} from '../validations/project.validation';

interface ProjectParams extends ParamsDictionary {
  id: string;
}

export class ProjectController {
  private readonly projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  createProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = createProjectSchema.safeParse(req.body);

      if (!result.success) {
        throw new BadRequestException(result.error.issues[0].message);
      }

      const projectDto: CreateProjectDto = result.data;

      const project = await this.projectService.create(
        req.user!.userId,
        projectDto,
      );

      res.status(201).json({
        success: true,
        message: 'Project created successfully.',
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };

  getProjects = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const projects = await this.projectService.getAll(req.user!.userId);

      res.status(200).json({
        success: true,
        message: 'Projects fetched successfully.',
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  };

  getProjectById = async (
    req: Request<ProjectParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const project = await this.projectService.getById(
        req.params.id,
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Project fetched successfully.',
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProject = async (
    req: Request<ProjectParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = updateProjectSchema.safeParse(req.body);

      if (!result.success) {
        throw new BadRequestException(result.error.issues[0].message);
      }

      const projectDto: UpdateProjectDto = result.data;

      const project = await this.projectService.update(
        req.params.id,
        req.user!.userId,
        projectDto,
      );

      res.status(200).json({
        success: true,
        message: 'Project updated successfully.',
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteProject = async (
    req: Request<ProjectParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const project = await this.projectService.delete(
        req.params.id,
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Project deleted successfully.',
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };
}