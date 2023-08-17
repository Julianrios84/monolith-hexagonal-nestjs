import { IDeleteDto } from '@users/domain/dto';

export abstract class IDeleteUseCase {
  abstract delete(id: string): Promise<IDeleteDto>;
}