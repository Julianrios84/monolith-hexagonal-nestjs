import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Connection } from "@common/domain/constants";
import { IRepository } from "@experiences/domain/ports";
import { Experience } from "@experiences/infrastructure/entities/mysql";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { IUUIDService } from "@common/domain/adapters/uuid.interface";
import { IGetDto, ICreateDto, IUpdateDto, IDeleteDto } from "@experiences/domain/dto";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ExperienceModel } from "@experiences/domain/model";
import { GetDto } from "@experiences/application/dto";

@Injectable()
export class MySQLExperienceRepository implements IRepository {
  constructor(
    @InjectRepository(Experience, Connection.experience.name)
    private repository: Repository<Experience>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}

   async findAll(user_id: string): Promise<IGetDto[]> {
    const response =   await this.repository.find({ where: {user_id}})
    return this.mapper.mapArrayAsync(
      response,
      ExperienceModel,
      GetDto,
    );
  }


  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOne({ where: { experience_id: id, user_id} });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, ExperienceModel, GetDto);
  }

  async findIn(user_id: string, ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ where: { experience_id : In(ids), user_id} }),
      ExperienceModel,
      GetDto,
    );
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = await this.repository.save({ experience_id: await this.uuidService.create(), user_id,  ...body })
    return this.mapper.map(record, ExperienceModel, GetDto);
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
    await this.findOne(user_id, id);
    await this.repository.delete({ experience_id: id, user_id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}