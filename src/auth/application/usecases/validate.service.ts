import { Injectable } from "@nestjs/common";
import { IPayloadDto } from "src/auth/domain/dto";
import { IRepository, IValidateUseCase } from "src/auth/domain/ports";

@Injectable()
export class ValidateUseCase implements IValidateUseCase {

  constructor(
    private readonly authRepository: IRepository
  ) {}
  
  async validate(body: IPayloadDto): Promise<IPayloadDto | null> {
    return await this.authRepository.validate(body);
  }
}