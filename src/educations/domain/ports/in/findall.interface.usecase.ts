import { IGetDto } from "@educations/domain/dto";

export abstract class IFindAllUseCase {
  abstract findAll(user_id:string): Promise<IGetDto[]>;
}