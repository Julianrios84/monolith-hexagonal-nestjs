import { Injectable } from "@nestjs/common";
import { IGetUserDto, IUpdateUserDto } from "src/users/domain/dto";
import { IRepository, IUpdateUseCase } from "src/users/domain/ports";

@Injectable()
export class UpdateUseCase implements IUpdateUseCase {

  constructor(
    private readonly repository: IRepository
  ) {}

  async update(id: string, body: IUpdateUserDto): Promise<IGetUserDto> {
    return await this.repository.update(id, body);
  }

}