import { Injectable } from "@nestjs/common";
import { ICreateDto, IGetDto } from "src/curriculums/domain/dto";
import { ICreateUseCase, IRepository } from "src/curriculums/domain/ports";

@Injectable()
export class CreateUseCase implements ICreateUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async create(body: ICreateDto): Promise<IGetDto> {
    return await this.repostory.create(body);
  }

}