import { Injectable } from "@nestjs/common";
import { ICreateDto, IGetDto } from "src/experiences/domain/dto";
import { ICreateUseCase, IRepository } from "src/experiences/domain/ports";

@Injectable()
export class CreateUseCase implements ICreateUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async create(body: ICreateDto): Promise<IGetDto> {
    return await this.repostory.create(body);
  }

}