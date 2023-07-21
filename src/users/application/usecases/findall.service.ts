import { Injectable } from "@nestjs/common";
import { IGetUserDto } from "src/users/domain/dto";
import { IFindAllUseCase, IRepository } from "src/users/domain/ports";


@Injectable()
export class FindAllUseCase implements IFindAllUseCase {

  constructor(
    private readonly repository: IRepository
  ) {}

  async findAll(): Promise<IGetUserDto[]> {
    return await this.repository.findAll();
  }

}