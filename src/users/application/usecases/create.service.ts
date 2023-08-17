import { Injectable } from "@nestjs/common";
import { ICreateDto, IGetDto } from "@users/domain/dto";
import { ICreateUseCase, IRepository } from "@users/domain/ports";

@Injectable()
export class CreateUseCase implements ICreateUseCase {

  constructor(
    private readonly repository: IRepository
  ) {}

  async create(body: ICreateDto): Promise<IGetDto> {
    return await this.repository.create(body);
  }
  
}