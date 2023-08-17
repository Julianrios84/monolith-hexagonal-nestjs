import {
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { IRepository } from '@courses/domain/ports';
import { Course } from '@courses/infrastructure/entities/mongo';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from '@courses/domain/dto';
import { CourseModel } from '@courses/domain/model';
import { GetDto } from '@courses/application/dto';
import { Connection } from '@common/domain/constants';
import { IUUIDService } from '@common/domain/adapters';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class MongoCourseRepository implements IRepository {
  constructor(
    @InjectRepository(Course, Connection.course.name)
    private readonly repository: MongoRepository<Course>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}

  async findAll(user_id: string): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ where: {user_id}}),
      CourseModel,
      GetDto,
    );
  }

  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOneBy({ course_id: id, user_id });
    if (!response)
      throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, CourseModel, GetDto);
  }

  async findIn(
    user_id: string, 
    ids: string[],
  ): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ course_id: { $in: ids }, user_id }),
      CourseModel,
      GetDto,
    );
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = { course_id: await this.uuidService.create(), user_id, ...body };
    return this.mapper.map(await this.repository.save(record), CourseModel, GetDto);
  }

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    await this.findOne(user_id, id)
    await this.repository.update({ course_id:id, user_id }, body);
    const response = await this.repository.findOneBy({ course_id: id, user_id });
    return this.mapper.mapAsync(
      response,
      CourseModel,
      GetDto,
    );
  }

  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    await this.findOne(user_id, id)
    await this.repository.findOneAndDelete({ course_id: id, user_id});
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
