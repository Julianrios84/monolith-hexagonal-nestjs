import { IGetDto } from "../../dto";

export abstract class IFindActiveUseCase {
  abstract findActive(): Promise<IGetDto>;
}