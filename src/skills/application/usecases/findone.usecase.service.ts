import { Injectable } from "@nestjs/common";
import { IGetDto } from "@skills/domain/dto";
import { IFindOneUseCase, IRepository } from "@skills/domain/ports";

@Injectable()
export class FindOneUseCase implements IFindOneUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async findOne(user_id: string, id: string): Promise<IGetDto> {
    return await this.repostory.findOne(user_id, id);
  }

}