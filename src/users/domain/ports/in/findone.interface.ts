import { IGetDto } from "@users/domain/dto";

export abstract class IFindOneUseCase {
  abstract findOne(id: string): Promise<IGetDto>;
}