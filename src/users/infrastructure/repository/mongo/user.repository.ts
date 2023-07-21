
import {
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectModel } from '@nestjs/mongoose';

import {
  ICreateUserDto,
  IDeleteUserDto,
  IGetUserDto,
  IUpdateUserDto,
} from 'src/users/domain/dto';

import { GetDto } from 'src/users/application/dto';
import { UserModel } from 'src/users/domain/model';
import { Connection } from 'src/common/domain/constants';
import { IRepository } from 'src/users/domain/ports';
import { User } from '../../entities';
import { IBcryptService } from 'src/common/domain/adapters';

@Injectable()
export class MongoUserRepository implements IRepository {
  constructor(
    
    @InjectModel(Connection.user.collection, Connection.user.name)
    private readonly model: Model<User>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly bcryptService: IBcryptService,
  ) {}
 

  async findAll(): Promise<IGetUserDto[]> {
    return this.mapper.mapArrayAsync(
      await this.model.find().exec(),
      UserModel,
      GetDto,
    );
  }

  async findOne(id: string): Promise<IGetUserDto> {
    const response = await this.model.findOne({ _id: id }).exec();
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, UserModel, GetDto);
  }

  async create(body: ICreateUserDto): Promise<IGetUserDto> {
    const data = {
      ...body,
      password: await this.bcryptService.hash(body.password),
    };
    const record = new this.model(data);
    return this.mapper.map(await record.save(), UserModel, GetDto);
  }

  async update(id: string, body: IUpdateUserDto): Promise<IGetUserDto> {
    const data = {
      ...body,
      password: await this.bcryptService.hash(body.password),
    };
    return this.mapper.mapAsync(
      await this.model.findByIdAndUpdate(id, data, { new: true }).exec(),
      UserModel,
      GetDto,
    );
  }

  async delete(id: string): Promise<IDeleteUserDto> {
    await this.model.findByIdAndDelete(id).exec();
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }

  async findByUsername(username: string): Promise<IGetUserDto> {
    const response = await this.model.findOne({ username: username }).exec();
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, UserModel, GetDto);
  }
}
