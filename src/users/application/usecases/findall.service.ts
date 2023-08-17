import { Injectable } from "@nestjs/common";
import { IGetDto } from "@users/domain/dto";
import { IFindAllUseCase, IRepository } from "@users/domain/ports";


@Injectable()
export class FindAllUseCase implements IFindAllUseCase {

  constructor(
    private readonly repository: IRepository
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return await this.repository.findAll();
  }

}