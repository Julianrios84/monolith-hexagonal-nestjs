import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Connection } from "@common/domain/constants";
import { IRepository } from "@courses/domain/ports";
import { Course } from "@courses/infrastructure/entities/mysql";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { IUUIDService } from "@common/domain/adapters/uuid.interface";
import { IGetDto, ICreateDto, IUpdateDto, IDeleteDto } from "@courses/domain/dto";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CourseModel } from "@courses/domain/model";
import { GetDto } from "@courses/application/dto";

@Injectable()
export class MySQLCourseRepository implements IRepository {
  constructor(
    @InjectRepository(Course, Connection.course.name)
    private repository: Repository<Course>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}

   async findAll(): Promise<IGetDto[]> {
    const response =   await this.repository.find()
    return this.mapper.mapArrayAsync(
      response,
      CourseModel,
      GetDto,
    );
  }


  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOne({ where: { course_id: id, user_id} });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, CourseModel, GetDto);
  }

  async findIn(user_id: string, ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ where: { course_id : In(ids), user_id} }),
      CourseModel,
      GetDto,
    );
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = await this.repository.save({ course_id: await this.uuidService.create(), user_id,  ...body })
    return this.mapper.map(record, CourseModel, GetDto);
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
    await this.findOne(user_id, id);
    await this.repository.delete({ course_id: id, user_id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}