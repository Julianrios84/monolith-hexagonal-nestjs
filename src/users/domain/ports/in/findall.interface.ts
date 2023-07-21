import { IGetUserDto } from '../../dto';

export abstract class IFindAllUseCase {
  abstract findAll(): Promise<IGetUserDto[]>;
}