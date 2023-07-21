import { Injectable } from "@nestjs/common";
import { IGetUserDto } from "src/users/domain/dto";
import { IFindByUsernameUseCase, IRepository } from "src/users/domain/ports";


@Injectable()
export class FindByUsernameUseCase implements IFindByUsernameUseCase {

  constructor(
    private readonly repository: IRepository
  ) {}

  async findByUsername(username: string): Promise<IGetUserDto> {
    return await this.repository.findByUsername(username);
  }


}