import { ICreateDto, IGetDto } from '@users/domain/dto';

export abstract class ICreateUseCase {
  abstract create(body: ICreateDto): Promise<IGetDto>;
}