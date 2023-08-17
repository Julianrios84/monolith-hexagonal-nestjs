import { ICreateDto, IGetDto } from "@curriculums/domain/dto";

export abstract class ICreateUseCase {
  abstract create(user_id: string, body: ICreateDto): Promise<IGetDto>;
} 