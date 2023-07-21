import { Injectable } from "@nestjs/common";
import { IGetDto } from "src/certifications/domain/dto";
import { IFindOneUseCase, IRepository } from "src/certifications/domain/ports";

@Injectable()
export class FindOneUseCase implements IFindOneUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async findOne(id: string): Promise<IGetDto> {
    return await this.repostory.findOne(id);
  }

}