import { Injectable } from "@nestjs/common";
import { IGetDto, IUpdateDto } from "@experiences/domain/dto";
import { IRepository, IUpdateUseCase } from "@experiences/domain/ports";

@Injectable()
export class UpdateUseCase implements IUpdateUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    return await this.repostory.update(user_id, id, body);
  }

}