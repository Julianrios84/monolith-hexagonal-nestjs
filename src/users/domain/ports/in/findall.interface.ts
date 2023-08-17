import { IGetDto } from '@users/domain/dto';

export abstract class IFindAllUseCase {
  abstract findAll(): Promise<IGetDto[]>;
}