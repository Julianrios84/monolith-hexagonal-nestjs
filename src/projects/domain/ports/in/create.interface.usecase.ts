import { ICreateDto, IGetDto } from "../../dto";

export abstract class ICreateUseCase {
  abstract create(body: ICreateDto): Promise<IGetDto>;
} 