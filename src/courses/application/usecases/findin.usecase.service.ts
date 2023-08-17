import { Injectable } from "@nestjs/common";
import { IGetDto } from "@courses/domain/dto";
import { IFindInUseCase, IRepository } from "@courses/domain/ports";

@Injectable()
export class FindInUseCase implements IFindInUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async findIn(user_id: string, ids: string[]): Promise<IGetDto[]> {
    return await this.repostory.findIn(user_id, ids);
  }

}