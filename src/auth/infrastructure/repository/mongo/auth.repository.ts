import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

import { Connection } from '@common/domain/constants';
import { ISignInDto, ITokenDto, ISignUpDto, IPayloadDto } from '@auth/domain/dto';
import { IJwtService } from '@auth/domain/adapters';
import { User } from '@auth/infrastructure/entities/mongo';
import { IRepository } from '@auth/domain/ports';
import { IBcryptService, IUUIDService } from '@common/domain/adapters';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';


@Injectable()
export class MongoAuthRepository implements IRepository {
  constructor(
    
    @InjectRepository(User, Connection.auth.name)
    private readonly repository: MongoRepository<User>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly bcryptService: IBcryptService,

    private readonly jwtService: IJwtService,

    private readonly uuidService: IUUIDService
  ) {}
 

  async signin(body: ISignInDto): Promise<ITokenDto> {
    const response = await this.repository
      .findOneBy({
        email: body.email,
      });
    if (!response) throw new NotFoundException('User not found');

    const verify = await this.bcryptService.compare(
      body.password,
      response.password,
    );

    if (!verify) throw new BadRequestException('Password incorrect!');

    const token = await this.jwtService.createToken({
      id: response.user_id,
      username: response.username,
    });

    return { token };
  }
  
  async signup(body: ISignUpDto): Promise<ITokenDto> {
    const record = {
      user_id: await this.uuidService.create(),
      ...body,
      password: await this.bcryptService.hash(body.password),
    };
    const response = await this.repository.save(record);

    const token = await this.jwtService.createToken({
      id: response.user_id,
      username: response.username,
    });

    return { token };
  }


  async validate(payload: IPayloadDto): Promise<IPayloadDto | null> {
    const response = await this.repository.findOneBy({ username: payload.username, user_id: payload.id });
    if(!response) return null;
    return {
      id: response.user_id,
      username: response.username 
    };
  }
}
