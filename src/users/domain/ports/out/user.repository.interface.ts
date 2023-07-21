import {
  ICreateUserDto,
  IDeleteUserDto,
  IGetUserDto,
  IUpdateUserDto,
} from '../../dto';

export abstract class IRepository {
  abstract findAll(): Promise<IGetUserDto[]>;
  abstract findOne(id: string): Promise<IGetUserDto>;
  abstract findByUsername(username: string): Promise<IGetUserDto>;
  abstract create(body: ICreateUserDto): Promise<IGetUserDto>;
  abstract update(id: string, body: IUpdateUserDto): Promise<IGetUserDto>;
  abstract delete(id: string): Promise<IDeleteUserDto>;
}
