import { ICreateDto, IDeleteDto, IGetDto, IUpdateDto } from "@educations/domain/dto";

export abstract class IRepository {
  abstract findAll(user_id:string): Promise<IGetDto[]>;
  abstract findOne(user_id:string, id: string): Promise<IGetDto>;
  abstract findIn(user_id:string, ids: string[]): Promise<IGetDto[]>;
  abstract create(user_id:string, body: ICreateDto): Promise<IGetDto>;
  abstract update(user_id:string, id: string, body: IUpdateDto): Promise<IGetDto>;
  abstract delete(user_id:string, id: string): Promise<IDeleteDto>;
}