import { IGetUserDto } from "../../dto";

export abstract class IFindOneUseCase {
  abstract findOne(id: string): Promise<IGetUserDto>;
}