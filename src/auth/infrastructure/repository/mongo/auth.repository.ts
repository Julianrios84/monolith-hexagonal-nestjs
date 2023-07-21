import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Mapper } from '@automapper/core';
import { InjectModel } from '@nestjs/mongoose';
import { InjectMapper } from '@automapper/nestjs';

import { Connection } from 'src/common/domain/constants';
import { ISignInDto, ITokenDto, ISignUpDto, IPayloadDto } from 'src/auth/domain/dto';
import { IJwtService } from 'src/auth/domain/adapters';
import { User } from '../../entities/user.entity';
import { IRepository } from 'src/auth/domain/ports';
import { IBcryptService } from 'src/common/domain/adapters';


@Injectable()
export class MongoAuthRepository implements IRepository {
  constructor(
    
    @InjectModel(Connection.user.collection, Connection.user.name)
    private readonly model: Model<User>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly bcryptService: IBcryptService,

    private readonly jwtService: IJwtService,
  ) {}
 

  async signin(body: ISignInDto): Promise<ITokenDto> {
    const response = await this.model
      .findOne({
        email: body.email,
      })
      .exec();
    if (!response) throw new NotFoundException('User not found');

    const verify = await this.bcryptService.compare(
      body.password,
      response.password,
    );

    if (!verify) throw new BadRequestException('Password incorrect!');

    const token = await this.jwtService.createToken({
      id: response._id,
      username: response.username,
    });

    return { token };
  }
  
  async signup(body: ISignUpDto): Promise<ITokenDto> {
    const record = new this.model({
      ...body,
      password: await this.bcryptService.hash(body.password),
    });
    const response = await record.save();

    const token = await this.jwtService.createToken({
      id: response._id,
      username: response.username,
    });

    return { token };
  }


  async validate(payload: IPayloadDto): Promise<IPayloadDto | null> {
    const response = await this.model.findOne({ username: payload.username, _id: payload.id }).exec();
    if(!response) return null;
    return {
      id: response._id,
      username: response.username 
    };
  }
}
