import { Injectable } from "@nestjs/common";
import { IGetDto } from "src/presentations/domain/dto";
import { IFindOneUseCase, IRepository } from "src/presentations/domain/ports";

@Injectable()
export class FindOneUseCase implements IFindOneUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async findOne(id: string): Promise<IGetDto> {
    return await this.repostory.findOne(id);
  }

}