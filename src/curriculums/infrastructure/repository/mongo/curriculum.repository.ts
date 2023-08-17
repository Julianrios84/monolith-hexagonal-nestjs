import {
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { IRepository } from '@curriculums/domain/ports';
import { Curriculum } from '@curriculums/infrastructure/entities/mongo';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from '@curriculums/domain/dto';
import { CurriculumModel } from '@curriculums/domain/model';
import { GetDto } from '@curriculums/application/dto';
import { Connection } from '@common/domain/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { IUUIDService } from '@common/root/domain/adapters';

@Injectable()
export class MongoCurriculumRepository implements IRepository {
  constructor(
    @InjectRepository(Curriculum, Connection.curriculum.name)
    private readonly repository: MongoRepository<Curriculum>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}

  async findAll(user_id:string): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ where: { user_id }}),
      CurriculumModel,
      GetDto,
    );
  }

  async findOne(user_id:string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOneBy({ curriculum_id: id, user_id });
    if (!response)
      throw new NotFoundException('Record not found')
    return this.mapper.mapAsync(response, CurriculumModel, GetDto);
  }

  async findActive(user_id:string): Promise<IGetDto> {
    return this.mapper.mapAsync(
      await this.repository.findOneBy({ status: true, user_id }),
      CurriculumModel,
      GetDto,
    );
  }

  async create(user_id:string, body: ICreateDto): Promise<IGetDto> {
    const record = { curriculum_id: await this.uuidService.create(), user_id, ...body };
    return this.mapper.map(await this.repository.save(record), CurriculumModel, GetDto);
  }

  async update(user_id:string, id: string, body: IUpdateDto): Promise<IGetDto> {
    await this.findOne(user_id, id)
    await this.repository.update({ curriculum_id:id, user_id }, body);
    const response = await this.repository.findOneBy({ curriculum_id: id, user_id });
    return this.mapper.mapAsync(
      response,
      CurriculumModel,
      GetDto,
    );
  }

  async delete(user_id:string, id: string): Promise<IDeleteDto> {
    await this.findOne(user_id, id)
    await this.repository.findOneAndDelete({ curriculum_id: id, user_id});
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
