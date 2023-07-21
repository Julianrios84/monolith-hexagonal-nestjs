import { Injectable } from "@nestjs/common";
import { IGetDto } from "src/skills/domain/dto";
import { IFindInUseCase, IRepository } from "src/skills/domain/ports";

@Injectable()
export class FindInUseCase implements IFindInUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async findIn(ids: string[]): Promise<IGetDto[]> {
    return await this.repostory.findIn(ids);
  }

}