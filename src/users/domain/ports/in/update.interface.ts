import { IGetUserDto, IUpdateUserDto } from "../../dto";

export abstract class IUpdateUseCase {
  abstract update(id: string, body: IUpdateUserDto): Promise<IGetUserDto>;
}