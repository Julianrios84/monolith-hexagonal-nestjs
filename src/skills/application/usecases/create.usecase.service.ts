import { Injectable } from "@nestjs/common";
import { ICreateDto, IGetDto } from "src/skills/domain/dto";
import { ICreateUseCase, IRepository } from "src/skills/domain/ports";

@Injectable()
export class CreateUseCase implements ICreateUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async create(body: ICreateDto): Promise<IGetDto> {
    return await this.repostory.create(body);
  }

}