import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectModel } from '@nestjs/mongoose';

import { IRepository } from 'src/presentations/domain/ports';
import { Presentation } from 'src/presentations/infrastructure/entities';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from 'src/presentations/domain/dto';
import { PresentationModel } from 'src/presentations/domain/model';
import { GetDto } from 'src/presentations/application/dto';
import { Connection } from 'src/common/domain/constants';

@Injectable()
export class MongoPresentationRepository implements IRepository {
  constructor(
    @InjectModel(
      Connection.presentations.collection,
      Connection.presentations.name,
    )
    private readonly model: Model<Presentation>,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find().exec(),
      PresentationModel,
      GetDto,
    );
  }

  async findOne(id: string): Promise<IGetDto> {
    const response = await this.model.findOne({ _id: id }).exec();
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, PresentationModel, GetDto);
  }

  async create(body: ICreateDto): Promise<IGetDto> {
    const record = new this.model(body);
    return this.mapper.map(await record.save(), PresentationModel, GetDto);
  }

  async update(id: string, body: IUpdateDto): Promise<IGetDto> {
    return this.mapper.mapAsync(
      await this.model
        .findByIdAndUpdate(id, body, { new: true })
        .exec(),
      PresentationModel,
      GetDto,
    );
  }

  async delete(id: string): Promise<IDeleteDto> {
    await this.model.findByIdAndDelete(id).exec();
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
