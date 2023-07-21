import { Injectable } from "@nestjs/common";
import { ISignInDto, ITokenDto } from "src/auth/domain/dto";
import { IRepository, ISignInUseCase } from "src/auth/domain/ports";

@Injectable()
export class SignInUseCase implements ISignInUseCase {
  
  constructor(
    private readonly authRepository: IRepository
  ) {}

  async signin(body: ISignInDto): Promise<ITokenDto> {
    return await this.authRepository.signin(body);
  }

}