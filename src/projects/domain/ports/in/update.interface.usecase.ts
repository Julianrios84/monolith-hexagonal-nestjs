import { IGetDto, IUpdateDto } from "../../dto";

export abstract class IUpdateUseCase {
  abstract update(id: string, body: IUpdateDto): Promise<IGetDto>;
}