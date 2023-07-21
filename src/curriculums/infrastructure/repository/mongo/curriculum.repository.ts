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
import { IRepository } from 'src/curriculums/domain/ports';
import { Curriculum } from 'src/curriculums/infrastructure/entities';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from 'src/curriculums/domain/dto';
import { CurriculumModel } from 'src/curriculums/domain/model';
import { GetDto } from 'src/curriculums/application/dto';
import { Connection } from 'src/common/domain/constants';

@Injectable()
export class MongoCurriculumRepository implements IRepository {
  constructor(
    @InjectModel(Connection.curriculums.collection, Connection.curriculums.name)
    private readonly model: Model<Curriculum>,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find().exec(),
      CurriculumModel,
      GetDto,
    );
  }

  async findOne(id: string): Promise<IGetDto> {
    const response = await this.model.findOne({ _id: new ObjectId(id) }).exec();
    if (!response)
      throw new NotFoundException('Record not found')
    return this.mapper.mapAsync(response, CurriculumModel, GetDto);
  }

  async findActive(): Promise<IGetDto> {
    return this.mapper.mapAsync(
      await this.model.findOne({ status: true }).exec(),
      CurriculumModel,
      GetDto,
    );
  }

  async create(body: ICreateDto): Promise<IGetDto> {
    const record = new this.model(body);
    return this.mapper.map(await record.save(), CurriculumModel, GetDto);
  }

  async update(id: string, body: IUpdateDto): Promise<IGetDto> {
    return this.mapper.mapAsync(
      await this.model
        .findByIdAndUpdate(new ObjectId(id), body, { new: true })
        .exec(),
      CurriculumModel,
      GetDto,
    );
  }

  async delete(id: string): Promise<IDeleteDto> {
    await this.model.findByIdAndDelete(new ObjectId(id)).exec();
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
