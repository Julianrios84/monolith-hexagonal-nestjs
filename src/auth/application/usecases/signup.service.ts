import { Injectable } from "@nestjs/common";
import { ISignUpDto, ITokenDto } from "src/auth/domain/dto";
import { IRepository, ISignUpUseCase } from "src/auth/domain/ports";

@Injectable()
export class SignUpUseCase implements ISignUpUseCase {

  constructor(
    private readonly authRepository: IRepository
  ) {}
  
  async signup(body: ISignUpDto): Promise<ITokenDto> {
    return await this.authRepository.signup(body);
  }
}