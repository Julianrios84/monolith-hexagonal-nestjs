import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { IGetDto, ICreateDto, IUpdateDto, IDeleteDto } from "@skills/domain/dto";
import { IRepository } from "@skills/domain/ports";
import { In, Repository } from "typeorm";
import { Skill } from "@skills/infrastructure/entities/postgres";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { SkillModel } from "@skills/domain/model";
import { GetDto } from "@skills/application/dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection } from "@common/domain/constants";
import { IUUIDService } from "@common/domain/adapters/uuid.interface";

@Injectable()
export class PostgresSkillRepository implements IRepository {
  
  constructor(
    @InjectRepository(Skill, Connection.skill.name)
    private repository: Repository<Skill>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService,
  ) {}
  
  async findAll(user_id: string,): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ where: { user_id } }),
      SkillModel,
      GetDto,
    );
  }

  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOne({ where: { skill_id: id, user_id } });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, SkillModel, GetDto);
  }

  async findIn(user_id: string, ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ where: { skill_id : In(ids), user_id} }),
      SkillModel,
      GetDto,
    );
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = await this.repository.save({ 
      // skill_id: await this.uuidService.create(),  
      user_id,
      ...body 
    })
    return this.mapper.map(record, SkillModel, GetDto);
  }

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    await this.findOne(user_id, id)
    await this.repository.update({ skill_id:id, user_id }, body);
    const response = await this.repository.findOneBy({ skill_id: id, user_id });
    return this.mapper.mapAsync(
      response,
      SkillModel,
      GetDto,
    );
  }
  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    await this.findOne(user_id, id);
    await this.repository.delete({ skill_id: id, user_id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}