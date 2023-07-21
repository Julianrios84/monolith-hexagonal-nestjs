import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectModel } from '@nestjs/mongoose';

import { ObjectId } from 'bson';
import { IRepository } from 'src/projects/domain/ports';
import { Project } from 'src/projects/infrastructure/entities/project.entity';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from 'src/projects/domain/dto';
import { ProjectModel } from 'src/projects/domain/model';
import { GetDto } from 'src/projects/application/dto';
import { Connection } from 'src/common/domain/constants';

@Injectable()
export class MongoProjectRepository implements IRepository {
  constructor(
    @InjectModel(Connection.projects.collection, Connection.projects.name)
    private readonly model: Model<Project>,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find().exec(),
      ProjectModel,
      GetDto,
    );
  }

  async findOne(id: string): Promise<IGetDto> {
    const response = await this.model.findOne({ _id: id }).exec();
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, ProjectModel, GetDto);
  }

  async findIn(ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find({ _id: { $in: ids } }).exec(),
      ProjectModel,
      GetDto,
    );
  }

  async create(body: ICreateDto): Promise<IGetDto> {
    const record = new this.model(body);
    return this.mapper.map(await record.save(), ProjectModel, GetDto);
  }

  async update(id: string, body: IUpdateDto): Promise<IGetDto> {
    return this.mapper.mapAsync(
      await this.model
        .findByIdAndUpdate(id, body, { new: true })
        .exec(),
      ProjectModel,
      GetDto,
    );
  }

  async delete(id: string): Promise<IDeleteDto> {
    await this.model.findByIdAndDelete(id).exec();
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
