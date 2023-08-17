import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { IRepository } from '@certifications/domain/ports';
import { Certification } from '@certifications/infrastructure/entities/mongo';
import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from '@certifications/domain/dto';
import { CertificationModel } from '@certifications/domain/model';
import { GetDto } from '@certifications/application/dto';
import { Connection } from '@common/domain/constants';
import { IUUIDService } from '@common/domain/adapters';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class MongoCertificationRepository implements IRepository {
  constructor(
    @InjectRepository(Certification, Connection.certification.name)
    private readonly repository: MongoRepository<Certification>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}

  async findAll(user_id: string): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ where: {user_id}}),
      CertificationModel,
      GetDto,
    );
  }

  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOneBy({ certification_id: id, user_id });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, CertificationModel, GetDto);
  }

  async findIn(user_id: string, ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ certification_id: { $in: ids }, user_id }),
      CertificationModel,
      GetDto,
    );
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = { certification_id: await this.uuidService.create(), user_id, ...body };
    return this.mapper.map(await this.repository.save(record), CertificationModel, GetDto);
  }

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    await this.findOne(user_id, id)
    await this.repository.update({ certification_id:id, user_id }, body);
    const response = await this.repository.findOneBy({ certification_id: id, user_id });
    return this.mapper.mapAsync(
      response,
      CertificationModel,
      GetDto,
    );
  }

  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    await this.findOne(user_id, id)
    await this.repository.findOneAndDelete({ certification_id: id, user_id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}
