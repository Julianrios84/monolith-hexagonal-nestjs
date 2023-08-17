import { IGetDto, IUpdateDto } from "../../dto";

export abstract class IUpdateUseCase {
  abstract update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto>;
}