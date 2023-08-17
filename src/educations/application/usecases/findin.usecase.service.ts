import { Injectable } from "@nestjs/common";
import { IGetDto } from "@educations/domain/dto";
import { IFindInUseCase, IRepository } from "@educations/domain/ports";

@Injectable()
export class FindInUseCase implements IFindInUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async findIn(user_id: string, ids: string[]): Promise<IGetDto[]> {
    return await this.repostory.findIn(user_id, ids);
  }

}