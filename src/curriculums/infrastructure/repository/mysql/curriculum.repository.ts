import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Connection } from "@common/domain/constants";
import { IRepository } from "@curriculums/domain/ports";
import { Curriculum } from "@curriculums/infrastructure/entities/mysql";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { IUUIDService } from "@common/domain/adapters/uuid.interface";
import { IGetDto, ICreateDto, IUpdateDto, IDeleteDto } from "@curriculums/domain/dto";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CurriculumModel } from "@curriculums/domain/model";
import { GetDto } from "@curriculums/application/dto";

@Injectable()
export class MySQLCurriculumRepository implements IRepository {
  constructor(
    @InjectRepository(Curriculum, Connection.curriculum.name)
    private repository: Repository<Curriculum>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}
  
  async findActive(user_id: string): Promise<IGetDto> {
    return this.mapper.mapAsync(
      await this.repository.findOneBy({ status: true, user_id }),
      CurriculumModel,
      GetDto,
    );
  }

   async findAll(user_id: string): Promise<IGetDto[]> {
    const response =   await this.repository.find({ where: { user_id } })
    return this.mapper.mapArrayAsync(
      response,
      CurriculumModel,
      GetDto,
    );
  }


  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOne({ where: { curriculum_id: id, user_id} });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, CurriculumModel, GetDto);
  }

  async findIn(user_id: string, ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ where: { curriculum_id : In(ids), user_id } }),
      CurriculumModel,
      GetDto,
    );
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = await this.repository.save({ curriculum_id: await this.uuidService.create(), user_id,  ...body })
    return this.mapper.map(record, CurriculumModel, GetDto);
  }

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    await this.findOne(user_id, id)
    await this.repository.update({ curriculum_id:id, user_id }, body);
    const response = await this.repository.findOneBy({ curriculum_id: id, user_id });
    return this.mapper.mapAsync(
      response,
      CurriculumModel,
      GetDto,
    );
  }
  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    await this.findOne(user_id, id);
    await this.repository.delete({ curriculum_id: id, user_id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}