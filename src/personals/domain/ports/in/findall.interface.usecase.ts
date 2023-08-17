import { IGetDto } from "@personals/domain/dto";

export abstract class IFindAllUseCase {
  abstract findAll(user_id: string): Promise<IGetDto[]>;
}