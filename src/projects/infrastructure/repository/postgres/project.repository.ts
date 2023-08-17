import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Connection } from "@common/domain/constants";
import { IRepository } from "@projects/domain/ports";
import { Project } from "@projects/infrastructure/entities/postgres";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { IUUIDService } from "@common/domain/adapters/uuid.interface";
import { IGetDto, ICreateDto, IUpdateDto, IDeleteDto } from "@projects/domain/dto";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ProjectModel } from "@projects/domain/model";
import { GetDto } from "@projects/application/dto";

@Injectable()
export class PostgresProjectRepository implements IRepository {
  constructor(
    @InjectRepository(Project, Connection.project.name)
    private repository: Repository<Project>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}

   async findAll(user_id: string): Promise<IGetDto[]> {
    const response =   await this.repository.find({ where: {user_id}})
    return this.mapper.mapArrayAsync(
      response,
      ProjectModel,
      GetDto,
    );
  }


  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOne({ where: { project_id: id, user_id} });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, ProjectModel, GetDto);
  }

  async findIn(user_id: string, ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ where: { project_id : In(ids), user_id} }),
      ProjectModel,
      GetDto,
    );
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = await this.repository.save({ 
      // project_id: await this.uuidService.create(),  
      user_id,
      ...body 
    })
    return this.mapper.map(record, ProjectModel, GetDto);
  }

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    await this.findOne(user_id, id)
    await this.repository.update({ project_id:id, user_id }, body);
    const response = await this.repository.findOneBy({ project_id: id, user_id });
    return this.mapper.mapAsync(
      response,
      ProjectModel,
      GetDto,
    );
  }
  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    await this.findOne(user_id, id);
    await this.repository.delete({ project_id: id, user_id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}