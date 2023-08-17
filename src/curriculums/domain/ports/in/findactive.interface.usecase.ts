import { IGetDto } from "@curriculums/domain/dto";

export abstract class IFindActiveUseCase {
  abstract findActive(user_id: string): Promise<IGetDto>;
}