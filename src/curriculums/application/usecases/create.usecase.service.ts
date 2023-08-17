import { Injectable } from "@nestjs/common";
import { ICreateDto, IGetDto } from "@curriculums/domain/dto";
import { ICreateUseCase, IRepository } from "@curriculums/domain/ports";

@Injectable()
export class CreateUseCase implements ICreateUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async create(user_id:string, body: ICreateDto): Promise<IGetDto> {
    return await this.repostory.create(user_id, body);
  }

}