import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

import { IRepository } from '@presentations/domain/ports';
import { Presentation } from '@presentations/infrastructure/entities/mongo';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from '@presentations/domain/dto';
import { PresentationModel } from '@presentations/domain/model';
import { GetDto } from '@presentations/application/dto';
import { Connection } from '@common/domain/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { IUUIDService } from '@common/root/domain/adapters';

@Injectable()
export class MongoPresentationRepository implements IRepository {
  constructor(

    @InjectRepository(Presentation, Connection.presentation.name)
    private readonly repository: MongoRepository<Presentation>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}

  async findAll(user_id: string): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ where: { user_id }}),
      PresentationModel,
      GetDto,
    );
  }

  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOneBy({ presentation_id: id, user_id });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, PresentationModel, GetDto);
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = { presentation_id: await this.uuidService.create(), user_id, ...body }
    return this.mapper.map(await this.repository.save(record), PresentationModel, GetDto);
  }

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    await this.findOne(user_id, id)
    await this.repository.update({ presentation_id:id, user_id }, body);
    const response = await this.repository.findOneBy({ presentation_id: id, user_id });
    return this.mapper.mapAsync(
      response,
      PresentationModel,
      GetDto,
    );
  }

  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    await this.findOne(user_id, id)
    await this.repository.findOneAndDelete({ presentation_id: id, user_id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
