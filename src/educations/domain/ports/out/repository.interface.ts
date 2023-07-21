import { ICreateDto, IDeleteDto, IGetDto, IUpdateDto } from "../../dto";

export abstract class IRepository {
  abstract findAll(): Promise<IGetDto[]>;
  abstract findOne(id: string): Promise<IGetDto>;
  abstract findIn(ids: string[]): Promise<IGetDto[]>;
  abstract create(body: ICreateDto): Promise<IGetDto>;
  abstract update(id: string, body: IUpdateDto): Promise<IGetDto>;
  abstract delete(id: string): Promise<IDeleteDto>;
}