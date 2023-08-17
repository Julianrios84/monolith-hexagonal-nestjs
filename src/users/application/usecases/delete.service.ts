import { Injectable } from "@nestjs/common";
import { IDeleteDto } from "@users/domain/dto";
import { IDeleteUseCase, IRepository } from "@users/domain/ports";


@Injectable()
export class DeleteUseCase implements IDeleteUseCase {
  
  constructor(
    private readonly repository: IRepository
  ) {}

 async delete(id: string): Promise<IDeleteDto> {
    return await this.repository.delete(id);
  }
  


}