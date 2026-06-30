import { Types } from 'mongoose';

import {
  CreateCertificationDto,
  UpdateCertificationDto,
} from '../dto/certification.dto';
import { CertificationDocument } from '../interfaces/certification.interface';
import { CertificationModel } from '../models/certification.model';

export class CertificationRepository {
  async create(
    userId: Types.ObjectId,
    dto: CreateCertificationDto,
  ): Promise<CertificationDocument> {
    return CertificationModel.create({
      ...dto,
      userId,
    });
  }

  async findAllByUserId(
    userId: Types.ObjectId,
  ): Promise<CertificationDocument[]> {
    return CertificationModel.find({ userId })
      .sort({ displayOrder: 1, issueDate: -1 })
      .exec();
  }

  async findByIdAndUserId(
    id: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<CertificationDocument | null> {
    return CertificationModel.findOne({
      _id: id,
      userId,
    }).exec();
  }

  async update(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    dto: UpdateCertificationDto,
  ): Promise<CertificationDocument | null> {
    return CertificationModel.findOneAndUpdate(
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
  ): Promise<CertificationDocument | null> {
    return CertificationModel.findOneAndDelete({
      _id: id,
      userId,
    }).exec();
  }
}