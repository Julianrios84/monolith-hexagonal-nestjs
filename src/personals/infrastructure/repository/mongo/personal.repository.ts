import {
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectModel } from '@nestjs/mongoose';
import { IRepository } from '@personals/domain/ports';
import { DataPersonal } from '@personals/infrastructure/entities/mongo';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from '@personals/domain/dto';
import { DataPersonalModel } from '@personals/domain/model';
import { GetDto } from '@personals/application/dto';
import { Connection } from '@common/domain/constants';
import { IUUIDService } from '@common/domain/adapters';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class MongoPersonalRepository implements IRepository {
  constructor(

    @InjectRepository(DataPersonal, Connection.personal.name)
    private readonly repository: MongoRepository<DataPersonal>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}

  async findAll(user_id: string): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ where: {user_id}}),
      DataPersonalModel,
      GetDto,
    );
  }

  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOneBy({ personal_id: id, user_id });
    if (!response)
      throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, DataPersonalModel, GetDto);
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = { personal_id: await this.uuidService.create(), user_id, ...body };
    return this.mapper.map(await this.repository.save(record), DataPersonalModel, GetDto);
  }

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    await this.findOne(user_id, id)
    await this.repository.update({ personal_id:id, user_id }, body);
    const response = await this.repository.findOneBy({ personal_id: id, user_id });
    return this.mapper.mapAsync(
      response,
      DataPersonalModel,
      GetDto,
    );
  }

  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    await this.findOne(user_id, id)
    await this.repository.findOneAndDelete({ personal_id:id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
