import { Injectable } from "@nestjs/common";
import { IDeleteUserDto } from "src/users/domain/dto";
import { IDeleteUseCase, IRepository } from "src/users/domain/ports";


@Injectable()
export class DeleteUseCase implements IDeleteUseCase {
  
  constructor(
    private readonly repository: IRepository
  ) {}

 async delete(id: string): Promise<IDeleteUserDto> {
    return await this.repository.delete(id);
  }
  


}