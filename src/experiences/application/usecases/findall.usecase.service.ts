import { Injectable } from "@nestjs/common";
import { IGetDto } from "src/experiences/domain/dto";
import { IFindAllUseCase, IRepository } from "src/experiences/domain/ports";

@Injectable()
export class FindAllUseCase implements IFindAllUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return await this.repostory.findAll();
  }

}