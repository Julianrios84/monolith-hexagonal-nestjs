import { IGetDto, IUpdateDto } from "@educations/domain/dto";

export abstract class IUpdateUseCase {
  abstract update(user_id:string, id: string, body: IUpdateDto): Promise<IGetDto>;
}