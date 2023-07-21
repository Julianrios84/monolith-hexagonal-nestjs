import { Injectable } from "@nestjs/common";
import { IGetDto } from "src/presentations/domain/dto";
import { IFindAllUseCase, IRepository } from "src/presentations/domain/ports";

@Injectable()
export class FindAllUseCase implements IFindAllUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return await this.repostory.findAll();
  }

}