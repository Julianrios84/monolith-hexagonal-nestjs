import { IGetDto } from "../../dto";

export abstract class IFindOneUseCase {
  abstract findOne(id: string): Promise<IGetDto>;
}