import { IGetDto } from "@courses/domain/dto";

export abstract class IFindInUseCase {
  abstract findIn(user_id: string, ids: string[]): Promise<IGetDto[]>;
}