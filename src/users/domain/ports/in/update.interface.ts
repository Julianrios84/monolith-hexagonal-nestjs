import { IGetDto, IUpdateDto } from "@users/domain/dto";

export abstract class IUpdateUseCase {
  abstract update(id: string, body: IUpdateDto): Promise<IGetDto>;
}