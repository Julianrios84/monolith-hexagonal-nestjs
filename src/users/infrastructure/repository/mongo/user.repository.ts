import {
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

import { User } from '@users/infrastructure/entities/mongo';
import { IRepository } from '@users/domain/ports';
import {
  ICreateDto, 
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from '@users/domain/dto';

import { UserModel } from '@users/domain/model';
import { GetDto } from '@users/application/dto';
import { Connection } from '@common/domain/constants';
import { IUUIDService, IBcryptService } from '@common/domain/adapters';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class MongoUserRepository implements IRepository {
  constructor(

    @InjectRepository(User, Connection.user.name)
    private readonly repository: MongoRepository<User>,

    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly bcryptService: IBcryptService,
    private readonly uuidService: IUUIDService
  ) {}
 
  async findAll(): Promise<IGetDto[]> {
    const response = await this.repository.find({});
    return this.mapper.mapArrayAsync(
      response,
      UserModel,
      GetDto,
    );
  }

  async findOne(id: string): Promise<IGetDto> {
    const response = await this.repository.findOneBy({ user_id: id });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, UserModel, GetDto);
  }

  async create(body: ICreateDto): Promise<IGetDto> {
    const record = {
      user_id: await this.uuidService.create(),
      ...body, 
      password: await this.bcryptService.hash(body.password),
    };

    return this.mapper.map(await this.repository.save(record), UserModel, GetDto);
  }

  async update(id: string, body: IUpdateDto): Promise<IGetDto> {
    const data = {
      ...body,
      password: await this.bcryptService.hash(body.password),
    };

    const record = await this.findOne(id);
    const result = { ...record, ...data };
    const response = await this.repository.save(result);
    return this.mapper.mapAsync(
      response,
      UserModel,
      GetDto,
    );
  }

  async delete(id: string): Promise<IDeleteDto> {
    await this.findOne(id);
    await this.repository.findOneAndDelete({ user_id: id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }

  async findByUsername(username: string): Promise<IGetDto> {
    const response = await this.repository.findOneBy({ username: username });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, UserModel, GetDto);
  }
}
