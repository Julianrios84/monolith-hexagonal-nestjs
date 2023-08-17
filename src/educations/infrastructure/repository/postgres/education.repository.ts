import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Connection } from "@common/domain/constants";
import { IRepository } from "@educations/domain/ports";
import { Education } from "@educations/infrastructure/entities/postgres";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { IUUIDService } from "@common/domain/adapters/uuid.interface";
import { IGetDto, ICreateDto, IUpdateDto, IDeleteDto } from "@educations/domain/dto";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { EducationModel } from "@educations/domain/model";
import { GetDto } from "@educations/application/dto";

@Injectable()
export class PostgresEducationRepository implements IRepository {
  constructor(
    @InjectRepository(Education, Connection.education.name)
    private repository: Repository<Education>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}

   async findAll(user_id: string): Promise<IGetDto[]> {
    const response =   await this.repository.find({ where: { user_id }})
    return this.mapper.mapArrayAsync(
      response,
      EducationModel,
      GetDto,
    );
  }


  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOne({ where: { education_id: id, user_id } });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, EducationModel, GetDto);
  }

  async findIn(user_id: string, ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ where: { education_id : In(ids), user_id} }),
      EducationModel,
      GetDto,
    );
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = await this.repository.save({ 
      // education_id: await this.uuidService.create(),  
      user_id,
      ...body })
    return this.mapper.map(record, EducationModel, GetDto);
  }

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    await this.findOne(user_id, id)
    await this.repository.update({ education_id:id, user_id }, body);
    const response = await this.repository.findOneBy({ education_id: id, user_id });
    return this.mapper.mapAsync(
      response,
      EducationModel,
      GetDto,
    );
  }
  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    await this.findOne(user_id, id);
    await this.repository.delete({ education_id: id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}