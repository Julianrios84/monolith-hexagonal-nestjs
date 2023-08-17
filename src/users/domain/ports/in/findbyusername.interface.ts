import { IGetDto } from "@users/domain/dto";

export abstract class IFindByUsernameUseCase  {
  abstract findByUsername(username: string): Promise<IGetDto>;
}