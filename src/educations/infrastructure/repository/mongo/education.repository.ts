import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { IRepository } from 'src/educations/domain/ports';
import { Education } from 'src/educations/infrastructure/entities';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from 'src/educations/domain/dto';
import { EducationModel } from 'src/educations/domain/model';
import { GetDto } from 'src/educations/application/dto';
import { Connection } from 'src/common/domain/constants';

@Injectable()
export class MongoEducationRepository implements IRepository {
  constructor(
    @InjectModel(Connection.educations.collection, Connection.educations.name)
    private readonly model: Model<Education>,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find().exec(),
      EducationModel,
      GetDto,
    );
  }

  async findOne(id: string): Promise<IGetDto> {
    const response = await this.model.findOne({ _id: new ObjectId(id) }).exec();
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, EducationModel, GetDto);
  }

  async findIn(ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find({ _id: { $in: ids } }).exec(),
      EducationModel,
      GetDto,
    );
  }

  async create(body: ICreateDto): Promise<IGetDto> {
    const record = new this.model(body);
    return this.mapper.map(await record.save(), EducationModel, GetDto);
  }

  async update(id: string, body: IUpdateDto): Promise<IGetDto> {
    return this.mapper.mapAsync(
      await this.model
        .findByIdAndUpdate(new ObjectId(id), body, { new: true })
        .exec(),
      EducationModel,
      GetDto,
    );
  }

  async delete(id: string): Promise<IDeleteDto> {
    await this.model.findByIdAndDelete(new ObjectId(id)).exec();
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
