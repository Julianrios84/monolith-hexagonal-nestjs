import { IGetDto } from "../../dto";

export abstract class IFindAllUseCase {
  abstract findAll(): Promise<IGetDto[]>;
}