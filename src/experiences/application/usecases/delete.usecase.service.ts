import { Injectable } from "@nestjs/common";
import { IDeleteDto } from "src/experiences/domain/dto";
import { IDeleteUseCase, IRepository } from "src/experiences/domain/ports";

@Injectable()
export class DeleteUseCase implements IDeleteUseCase {

  constructor(
    private readonly repostory: IRepository
  ) {}

  async delete(id: string): Promise<IDeleteDto> {
    return await this.repostory.delete(id);
  }

}