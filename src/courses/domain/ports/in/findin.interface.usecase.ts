import { IGetDto } from "../../dto";

export abstract class IFindInUseCase {
  abstract findIn(ids: string[]): Promise<IGetDto[]>;
}