import { ICreateUserDto, IGetUserDto } from '../../dto';

export abstract class ICreateUseCase {
  abstract create(body: ICreateUserDto): Promise<IGetUserDto>;
}