import { Injectable } from "@nestjs/common";
import { IDeleteDto } from "src/personals/domain/dto";
import { IDeleteUseCase, IRepository } from "src/personals/domain/ports";

@Injectable()
export class DeleteUseCase implements IDeleteUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async delete(id: string): Promise<IDeleteDto> {
    return await this.repostory.delete(id);
  }

}