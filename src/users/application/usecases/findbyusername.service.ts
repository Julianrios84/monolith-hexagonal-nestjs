import { Injectable } from "@nestjs/common";
import { IGetDto } from "@users/domain/dto";
import { IFindByUsernameUseCase, IRepository } from "@users/domain/ports";


@Injectable()
export class FindByUsernameUseCase implements IFindByUsernameUseCase {

  constructor(
    private readonly repository: IRepository
  ) {}

  async findByUsername(username: string): Promise<IGetDto> {
    return await this.repository.findByUsername(username);
  }


}