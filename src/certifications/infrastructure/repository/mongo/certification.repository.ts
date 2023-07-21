import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { IRepository } from 'src/certifications/domain/ports';
import { Certification } from 'src/certifications/infrastructure/entities';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from 'src/certifications/domain/dto';
import { CertificationModel } from 'src/certifications/domain/model';
import { GetDto } from 'src/certifications/application/dto';
import { Connection } from 'src/common/domain/constants';

@Injectable()
export class MongoCertificationRepository implements IRepository {
  constructor(
    @InjectModel(
      Connection.certifications.collection,
      Connection.certifications.name,
    )
    private readonly model: Model<Certification>,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find().exec(),
      CertificationModel,
      GetDto,
    );
  }

  async findOne(id: string): Promise<IGetDto> {
    const response = await this.model.findOne({ _id: new ObjectId(id) }).exec();
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, CertificationModel, GetDto);
  }

  async findIn(ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find({ _id: { $in: ids } }).exec(),
      CertificationModel,
      GetDto,
    );
  }

  async create(body: ICreateDto): Promise<IGetDto> {
    const record = new this.model(body);
    return this.mapper.map(await record.save(), CertificationModel, GetDto);
  }

  async update(id: string, body: IUpdateDto): Promise<IGetDto> {
    return this.mapper.mapAsync(
      await this.model
        .findByIdAndUpdate(new ObjectId(id), body, { new: true })
        .exec(),
      CertificationModel,
      GetDto,
    );
  }

  async delete(id: string): Promise<IDeleteDto> {
    await this.model.findByIdAndDelete(new ObjectId(id)).exec();
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
