import { Injectable } from "@nestjs/common";
import { IUpdateDto, IGetDto } from "src/skills/domain/dto";
import { IUpdateUseCase, IRepository } from "src/skills/domain/ports";

@Injectable()
export class UpdateUseCase implements IUpdateUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async update(id: string, body: IUpdateDto): Promise<IGetDto> {
    return await this.repostory.update(id, body);
  }

}