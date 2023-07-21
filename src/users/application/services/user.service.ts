import { Injectable } from '@nestjs/common';
import {
  ICreateUserDto,
  IDeleteUserDto,
  IGetUserDto,
  IUpdateUserDto,
} from 'src/users/domain/dto';
import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindOneUseCase,
  IFindByUsernameUseCase,
  IUpdateUseCase,
} from 'src/users/domain/ports';

@Injectable()
export class UserService
  implements
    IFindAllUseCase,
    IFindOneUseCase,
    ICreateUseCase,
    IUpdateUseCase,
    IDeleteUseCase
{
  constructor(
    private readonly findAllUseCase: IFindAllUseCase,
    private readonly findOneUseCase: IFindOneUseCase,
    private readonly findByUsernameUseCase: IFindByUsernameUseCase,
    private readonly createUseCase: ICreateUseCase,
    private readonly updateUseCase: IUpdateUseCase,
    private readonly deleteUseCase: IDeleteUseCase,
  ) {}

  async findAll(): Promise<IGetUserDto[]> {
    return await this.findAllUseCase.findAll();
  }

  async findOne(id: string): Promise<IGetUserDto> {
    return await this.findOneUseCase.findOne(id);
  }

  async findByUsername(username: string): Promise<IGetUserDto> {
    return await this.findByUsernameUseCase.findByUsername(username);
  }

  async create(body: ICreateUserDto): Promise<IGetUserDto> {
    return await this.createUseCase.create(body);
  }

  async update(id: string, body: IUpdateUserDto): Promise<IGetUserDto> {
    return await this.updateUseCase.update(id, body);
  }

  async delete(id: string): Promise<IDeleteUserDto> {
    return await this.deleteUseCase.delete(id);
  }

}
