import { IGetUserDto } from "../../dto";

export abstract class IFindByUsernameUseCase  {
  abstract findByUsername(username: string): Promise<IGetUserDto>;
}