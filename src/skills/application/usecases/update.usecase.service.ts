import { Injectable } from "@nestjs/common";
import { IUpdateDto, IGetDto } from "@skills/domain/dto";
import { IUpdateUseCase, IRepository } from "@skills/domain/ports";

@Injectable()
export class UpdateUseCase implements IUpdateUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    return await this.repostory.update(user_id, id, body);
  }

}