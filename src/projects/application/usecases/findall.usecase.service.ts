import { Injectable } from "@nestjs/common";
import { IGetDto } from "src/projects/domain/dto";
import { IFindAllUseCase, IRepository } from "src/projects/domain/ports";

@Injectable()
export class FindAllUseCase implements IFindAllUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return await this.repostory.findAll();
  }

}