import { ICreateDto, IGetDto } from "@projects/domain/dto";

export abstract class ICreateUseCase {
  abstract create(user_id: string, body: ICreateDto): Promise<IGetDto>;
} 