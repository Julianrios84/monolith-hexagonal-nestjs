import {
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectModel } from '@nestjs/mongoose';
import { IRepository } from 'src/personals/domain/ports';
import { DataPersonal } from 'src/personals/infrastructure/entities/personal.entity';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from 'src/personals/domain/dto';
import { DataPersonalModel } from 'src/personals/domain/model';
import { GetDto } from 'src/personals/application/dto';
import { Connection } from 'src/common/domain/constants';

@Injectable()
export class MongoPersonalRepository implements IRepository {
  constructor(
    @InjectModel(Connection.personals.collection, Connection.personals.name)
    private readonly model: Model<DataPersonal>,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find().exec(),
      DataPersonalModel,
      GetDto,
    );
  }

  async findOne(id: string): Promise<IGetDto> {
    const response = await this.model.findOne({ _id: id }).exec();
    if (!response)
      throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, DataPersonalModel, GetDto);
  }

  async create(body: ICreateDto): Promise<IGetDto> {
    const record = new this.model(body);
    return this.mapper.map(await record.save(), DataPersonalModel, GetDto);
  }

  async update(id: string, body: IUpdateDto): Promise<IGetDto> {
    return this.mapper.mapAsync(
      await this.model
        .findByIdAndUpdate(id, body, { new: true })
        .exec(),
      DataPersonalModel,
      GetDto,
    );
  }

  async delete(id: string): Promise<IDeleteDto> {
    await this.model.findByIdAndDelete(id).exec();
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
