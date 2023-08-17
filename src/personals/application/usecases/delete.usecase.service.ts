import { Injectable } from "@nestjs/common";
import { IDeleteDto } from "@personals/domain/dto";
import { IDeleteUseCase, IRepository } from "@personals/domain/ports";

@Injectable()
export class DeleteUseCase implements IDeleteUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    return await this.repostory.delete(user_id, id);
  }

}