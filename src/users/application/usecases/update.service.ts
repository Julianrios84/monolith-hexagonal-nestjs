import { Injectable } from "@nestjs/common";
import { IGetDto, IUpdateDto } from "@users/domain/dto";
import { IRepository, IUpdateUseCase } from "@users/domain/ports";

@Injectable()
export class UpdateUseCase implements IUpdateUseCase {

  constructor(
    private readonly repository: IRepository
  ) {}

  async update(id: string, body: IUpdateDto): Promise<IGetDto> {
    return await this.repository.update(id, body);
  }

}