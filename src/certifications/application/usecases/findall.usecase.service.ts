import { Injectable } from "@nestjs/common";
import { IGetDto } from "@certifications/domain/dto";
import { IFindAllUseCase, IRepository } from "@certifications/domain/ports";

@Injectable()
export class FindAllUseCase implements IFindAllUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async findAll(user_id: string, ): Promise<IGetDto[]> {
    return await this.repostory.findAll(user_id);
  }

}