import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { IRepository } from '@educations/domain/ports';
import { Education } from '@educations/infrastructure/entities/mongo';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from '@educations/domain/dto';
import { EducationModel } from '@educations/domain/model';
import { GetDto } from '@educations/application/dto';
import { Connection } from '@common/domain/constants';
import { IUUIDService } from '@common/domain/adapters';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class MongoEducationRepository implements IRepository {
  constructor(

    @InjectRepository(Education, Connection.education.name)
    private readonly repository: MongoRepository<Education>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}

  async findAll(user_id: string): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ where: { user_id } }),
      EducationModel,
      GetDto,
    );
  }

  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOneBy({ education_id: id, user_id });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, EducationModel, GetDto);
  }

  async findIn(user_id: string,  ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ education_id: { $in: ids }, user_id }),
      EducationModel,
      GetDto,
    );
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = { education_id: await this.uuidService.create(), user_id, ...body };
    return this.mapper.map(await this.repository.save(record), EducationModel, GetDto);
  }

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    await this.findOne(user_id, id)
    await this.repository.update({ education_id:id, user_id }, body);
    const response = await this.repository.findOneBy({ education_id: id, user_id });
    return this.mapper.mapAsync(
      response,
      EducationModel,
      GetDto,
    );
  }

  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    await this.findOne(user_id, id)
    await this.repository.findOneAndDelete({ education_id: id, user_id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
