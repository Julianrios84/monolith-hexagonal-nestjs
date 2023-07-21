
import {
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectModel } from '@nestjs/mongoose';

import { Skill } from '../../entities/skill.entity';
import { IRepository } from 'src/skills/domain/ports';
import { ICreateDto, IDeleteDto, IGetDto, IUpdateDto } from 'src/skills/domain/dto';
import { SkillModel } from 'src/skills/domain/model';
import { GetDto } from 'src/skills/application/dto';
import { Connection } from 'src/common/domain/constants';

@Injectable()
export class MongoSkillRepository implements IRepository {
  constructor(
    @InjectModel(Connection.skill.collection, Connection.skill.name)
    private readonly model: Model<Skill>,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find().exec(),
      SkillModel,
      GetDto,
    );
  }

  async findOne(id: string): Promise<IGetDto> {
    const response = await this.model.findOne({ _id: id }).exec();
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, SkillModel, GetDto);
  }

  async findIn(ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find({ _id: { $in: ids } }).exec(),
      SkillModel,
      GetDto,
    );
  }

  async create(body: ICreateDto): Promise<IGetDto> {
    const record = new this.model(body);
    return this.mapper.map(await record.save(), SkillModel, GetDto);
  }

  async update(id: string, body: IUpdateDto): Promise<IGetDto> {
    return this.mapper.mapAsync(
      await this.model.findByIdAndUpdate(id, body, { new: true }).exec(),
      SkillModel,
      GetDto,
    );
  }

  async delete(id: string): Promise<IDeleteDto> {
    await this.model.findByIdAndDelete(new Types.ObjectId(id)).exec();
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }

}
