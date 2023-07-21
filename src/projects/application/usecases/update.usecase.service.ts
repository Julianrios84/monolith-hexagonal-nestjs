import { Injectable } from "@nestjs/common";
import { IGetDto, IUpdateDto } from "src/projects/domain/dto";
import { IRepository, IUpdateUseCase } from "src/projects/domain/ports";

@Injectable()
export class UpdateUseCase implements IUpdateUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async update(id: string, body: IUpdateDto): Promise<IGetDto> {
    return await this.repostory.update(id, body);
  }

}