import {
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectModel } from '@nestjs/mongoose';
import { IRepository } from 'src/experiences/domain/ports';
import { WorkExperience } from 'src/experiences/infrastructure/entities';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from 'src/experiences/domain/dto';
import { WorkExperienceModel } from 'src/experiences/domain/model';
import { GetDto } from 'src/experiences/application/dto';
import { Connection } from 'src/common/domain/constants';

@Injectable()
export class MongoExperiencelRepository implements IRepository {
  constructor(
    @InjectModel(Connection.experiences.collection, Connection.experiences.name)
    private readonly model: Model<WorkExperience>,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find().exec(),
      WorkExperienceModel,
      GetDto,
    );
  }

  async findOne(id: string): Promise<IGetDto> {
    const response = await this.model.findOne({ _id: id }).exec();
    if (!response)
      throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, WorkExperienceModel, GetDto);
  }

  async findIn(ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find({ _id: { $in: ids } }).exec(),
      WorkExperienceModel,
      GetDto,
    );
  }

  async create(body: ICreateDto): Promise<IGetDto> {
    const record = new this.model(body);
    return this.mapper.map(await record.save(), WorkExperienceModel, GetDto);
  }

  async update(id: string, body: IUpdateDto): Promise<IGetDto> {
    return this.mapper.mapAsync(
      await this.model
        .findByIdAndUpdate(id, body, { new: true })
        .exec(),
      WorkExperienceModel,
      GetDto,
    );
  }

  async delete(id: string): Promise<IDeleteDto> {
    await this.model.findByIdAndDelete(id).exec();
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
