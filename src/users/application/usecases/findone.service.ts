import { Injectable } from "@nestjs/common";
import { IGetDto } from "@users/domain/dto";
import { IFindOneUseCase, IRepository } from "@users/domain/ports";



@Injectable()
export class FindOneUseCase implements IFindOneUseCase {
  
  constructor(
    private readonly repository: IRepository
  ) {}

  async findOne(id: string): Promise<IGetDto> {
    return await this.repository.findOne(id);
  }

}