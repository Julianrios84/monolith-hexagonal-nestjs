import { IDeleteUserDto } from '../../dto';

export abstract class IDeleteUseCase {
  abstract delete(id: string): Promise<IDeleteUserDto>;
}