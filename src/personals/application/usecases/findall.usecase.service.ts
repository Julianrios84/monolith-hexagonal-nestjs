import { Injectable } from "@nestjs/common";
import { IGetDto } from "@personals/domain/dto";
import { IFindAllUseCase, IRepository } from "@personals/domain/ports";

@Injectable()
export class FindAllUseCase implements IFindAllUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async findAll(user_id: string): Promise<IGetDto[]> {
    return await this.repostory.findAll(user_id);
  }

}