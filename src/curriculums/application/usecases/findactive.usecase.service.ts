import { Injectable } from "@nestjs/common";
import { IGetDto } from "src/curriculums/domain/dto";
import { IFindActiveUseCase, IRepository } from "src/curriculums/domain/ports";

@Injectable()
export class FindActiveUseCase implements IFindActiveUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}
  
  async findActive(): Promise<IGetDto> {
    return await this.repostory.findActive();
  }

}