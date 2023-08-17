import { Injectable } from "@nestjs/common";
import { IGetDto } from "@projects/domain/dto";
import { IFindAllUseCase, IRepository } from "@projects/domain/ports";

@Injectable()
export class FindAllUseCase implements IFindAllUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async findAll(user_id: string): Promise<IGetDto[]> {
    return await this.repostory.findAll(user_id);
  }

}