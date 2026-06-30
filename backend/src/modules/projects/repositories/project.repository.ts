import { Types } from 'mongoose';

import {
  CreateProjectDto,
  UpdateProjectDto,
} from '../dto/project.dto';
import { ProjectDocument } from '../interfaces/project.interface';
import { ProjectModel } from '../models/project.model';

type CreateProjectData = Omit<CreateProjectDto, 'technologies'> & {
  technologies: Types.ObjectId[];
};

type UpdateProjectData = Omit<UpdateProjectDto, 'technologies'> & {
  technologies?: Types.ObjectId[];
};

export class ProjectRepository {
  async create(
    userId: Types.ObjectId,
    dto: CreateProjectData,
  ): Promise<ProjectDocument> {
    return ProjectModel.create({
      ...dto,
      userId,
    });
  }

  async findAllByUserId(
    userId: Types.ObjectId,
  ): Promise<ProjectDocument[]> {
    return ProjectModel.find({ userId })
      .sort({ displayOrder: 1, createdAt: -1 })
      .exec();
  }

  async findByIdAndUserId(
    id: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<ProjectDocument | null> {
    return ProjectModel.findOne({
      _id: id,
      userId,
    }).exec();
  }

  async update(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    dto: UpdateProjectData,
  ): Promise<ProjectDocument | null> {
    return ProjectModel.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        $set: dto,
      },
      {
        new: true,
        runValidators: true,
      },
    ).exec();
  }

  async delete(
    id: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<ProjectDocument | null> {
    return ProjectModel.findOneAndDelete({
      _id: id,
      userId,
    }).exec();
  }
}