import { IGetDto } from "@projects/domain/dto";

export abstract class IFindOneUseCase {
  abstract findOne(user_id: string, id: string): Promise<IGetDto>;
}