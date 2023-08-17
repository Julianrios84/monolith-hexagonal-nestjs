import { Injectable } from "@nestjs/common";
import { IGetDto } from "@curriculums/domain/dto";
import { IFindActiveUseCase, IRepository } from "@curriculums/domain/ports";

@Injectable()
export class FindActiveUseCase implements IFindActiveUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}
  
  async findActive(user_id:string): Promise<IGetDto> {
    return await this.repostory.findActive(user_id);
  }

}