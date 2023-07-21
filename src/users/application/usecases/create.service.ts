import { Injectable } from "@nestjs/common";
import { ICreateUserDto, IGetUserDto } from "src/users/domain/dto";
import { ICreateUseCase, IRepository } from "src/users/domain/ports";

@Injectable()
export class CreateUseCase implements ICreateUseCase {

  constructor(
    private readonly repository: IRepository
  ) {}

  async create(body: ICreateUserDto): Promise<IGetUserDto> {
    return await this.repository.create(body);
  }
  
}