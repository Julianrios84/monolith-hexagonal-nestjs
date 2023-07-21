import { Injectable } from "@nestjs/common";
import { IGetDto } from "src/personals/domain/dto";
import { IFindAllUseCase, IRepository } from "src/personals/domain/ports";

@Injectable()
export class FindAllUseCase implements IFindAllUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return await this.repostory.findAll();
  }

}