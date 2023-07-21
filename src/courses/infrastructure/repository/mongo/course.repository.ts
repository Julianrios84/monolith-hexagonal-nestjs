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
import { IRepository } from 'src/courses/domain/ports';
import { Course } from 'src/courses/infrastructure/entities';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from 'src/courses/domain/dto';
import { CourseModel } from 'src/courses/domain/model';
import { GetDto } from 'src/courses/application/dto';
import { Connection } from 'src/common/domain/constants';

@Injectable()
export class MongoCourseRepository implements IRepository {
  constructor(
    @InjectModel(Connection.courses.collection, Connection.courses.name)
    private readonly model: Model<Course>,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find().exec(),
      CourseModel,
      GetDto,
    );
  }

  async findOne(id: string): Promise<IGetDto> {
    const response = await this.model.findOne({ _id: new ObjectId(id) }).exec();
    if (!response)
      throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, CourseModel, GetDto);
  }

  async findIn(
    ids: string[],
  ): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find({ _id: { $in: ids } }).exec(),
      CourseModel,
      GetDto,
    );
  }

  async create(body: ICreateDto): Promise<IGetDto> {
    const record = new this.model(body);
    return this.mapper.map(await record.save(), CourseModel, GetDto);
  }

  async update(id: string, body: IUpdateDto): Promise<IGetDto> {
    return this.mapper.mapAsync(
      await this.model
        .findByIdAndUpdate(new ObjectId(id), body, { new: true })
        .exec(),
      CourseModel,
      GetDto,
    );
  }

  async delete(id: string): Promise<IDeleteDto> {
    await this.model.findByIdAndDelete(new ObjectId(id)).exec();
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
