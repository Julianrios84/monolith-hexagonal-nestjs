import {
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

import { Skill } from '@skills/infrastructure/entities/mongo';
import { IRepository } from '@skills/domain/ports';
import { 
  ICreateDto, 
  IDeleteDto, 
  IGetDto, 
  IUpdateDto 
} from '@skills/domain/dto';

import { SkillModel } from '@skills/domain/model';
import { GetDto } from '@skills/application/dto';
import { Connection } from '@common/domain/constants';
import { IUUIDService } from '@common/domain/adapters';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';


@Injectable()
export class MongoSkillRepository implements IRepository {
  constructor(

    @InjectRepository(Skill, Connection.skill.name)
    private readonly repository: MongoRepository<Skill>,

    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly uuidService: IUUIDService,
  ) {}

  async findAll(user_id: string): Promise<IGetDto[]> {
    const response = await this.repository.find({ where: { user_id } });
    return this.mapper.mapArrayAsync(
      response,
      SkillModel,
      GetDto,
    );
  }

  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOneBy({ skill_id: id, user_id });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, SkillModel, GetDto);
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = {
      skill_id: await this.uuidService.create(),
      user_id,
      ...body
    }

    return this.mapper.map(await this.repository.save(record), SkillModel, GetDto);
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
    await this.findOne(user_id, id)
    await this.repository.findOneAndDelete({ skill_id: id, user_id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }

  async findIn(user_id: string, ids: string[]): Promise<IGetDto[]> {
    const response = await this.repository.find({ skill_id: { $in: ids }, user_id });
    return this.mapper.mapArrayAsync(response, SkillModel, GetDto);
  }

}
