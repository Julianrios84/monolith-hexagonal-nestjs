import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

import { IRepository } from '@projects/domain/ports';
import { Project } from '@projects/infrastructure/entities/mongo';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from '@projects/domain/dto';
import { ProjectModel } from '@projects/domain/model';
import { GetDto } from '@projects/application/dto';
import { Connection } from '@common/domain/constants';
import { IUUIDService } from '@common/domain/adapters';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class MongoProjectRepository implements IRepository {
  constructor(
    @InjectRepository(Project, Connection.project.name)
    private readonly repository: MongoRepository<Project>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}

  async findAll(user_id: string): Promise<IGetDto[]> {
    const response =   await this.repository.find({ where:  { user_id } })
    return this.mapper.mapArrayAsync(
      response,
      ProjectModel,
      GetDto,
    );
  }

  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOneBy({ project_id: id, user_id });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, ProjectModel, GetDto);
  }

  async findIn(user_id: string, ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ project_id: { $in: ids }, user_id }),
      ProjectModel,
      GetDto,
    );
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = { project_id: await this.uuidService.create(), user_id, ...body };
    return this.mapper.map(await this.repository.save(record), ProjectModel, GetDto);
  }

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    await this.findOne(user_id, id)
    await this.repository.update({ project_id:id, user_id }, body);
    const response = await this.repository.findOneBy({ project_id: id, user_id });
    return this.mapper.mapAsync(
      response,
      ProjectModel,
      GetDto,
    );
  }

  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    await this.findOne(user_id, id)
    await this.repository.findOneAndDelete({ project_id: id, user_id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
