import {
  ICreateDto,
  IDeleteDto,
  IGetDto,
  IUpdateDto,
} from '@users/domain/dto';

export abstract class IRepository {
  abstract findAll(): Promise<IGetDto[]>;
  abstract findOne(id: string): Promise<IGetDto>;
  abstract findByUsername(username: string): Promise<IGetDto>;
  abstract create(body: ICreateDto): Promise<IGetDto>;
  abstract update(id: string, body: IUpdateDto): Promise<IGetDto>;
  abstract delete(id: string): Promise<IDeleteDto>;
}
