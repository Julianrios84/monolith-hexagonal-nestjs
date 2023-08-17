import {
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { IRepository } from '@experiences/domain/ports';
import { Experience } from '@experiences/infrastructure/entities/mongo';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from '@experiences/domain/dto';
import { ExperienceModel } from '@experiences/domain/model';
import { GetDto } from '@experiences/application/dto';
import { Connection } from '@common/domain/constants';
import { IUUIDService } from '@common/domain/adapters';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class MongoExperiencelRepository implements IRepository {
  constructor(

    @InjectRepository(Experience, Connection.experience.name)
    private readonly repository: MongoRepository<Experience>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}

  async findAll(user_id: string): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ where: {user_id} }),
      ExperienceModel,
      GetDto,
    );
  }

  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOneBy({ experience_id: id, user_id });
    if (!response)
      throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, ExperienceModel, GetDto);
  }

  async findIn(user_id: string, ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ experience_id: { $in: ids }, user_id }),
      ExperienceModel,
      GetDto,
    );
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = { experience_id: await this.uuidService.create(), user_id, ...body };
    return this.mapper.map(await this.repository.save(record), ExperienceModel, GetDto);
  }

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    await this.findOne(user_id, id)
    await this.repository.update({ experience_id:id, user_id }, body);
    const response = await this.repository.findOneBy({ experience_id: id, user_id });
    return this.mapper.mapAsync(
      response,
      ExperienceModel,
      GetDto,
    );
  }

  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    await this.findOne(user_id, id)
    await this.repository.findOneAndDelete({ experience_id: id, user_id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
