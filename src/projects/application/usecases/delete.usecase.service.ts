import { Injectable } from "@nestjs/common";
import { IDeleteDto } from "@projects/domain/dto";
import { IDeleteUseCase, IRepository } from "@projects/domain/ports";

@Injectable()
export class DeleteUseCase implements IDeleteUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    return await this.repostory.delete(user_id, id);
  }

}