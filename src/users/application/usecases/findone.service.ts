import { Injectable } from "@nestjs/common";
import { IGetUserDto } from "src/users/domain/dto";
import { IFindOneUseCase, IRepository } from "src/users/domain/ports";



@Injectable()
export class FindOneUseCase implements IFindOneUseCase {
  
  constructor(
    private readonly repository: IRepository
  ) {}

  async findOne(id: string): Promise<IGetUserDto> {
    return await this.repository.findOne(id);
  }

}