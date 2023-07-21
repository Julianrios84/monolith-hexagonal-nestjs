import { Injectable } from "@nestjs/common";
import { IGetDto } from "src/curriculums/domain/dto";
import { IFindAllUseCase, IRepository } from "src/curriculums/domain/ports";

@Injectable()
export class FindAllUseCase implements IFindAllUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return await this.repostory.findAll();
  }

}