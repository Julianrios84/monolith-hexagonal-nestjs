import { Injectable } from "@nestjs/common";
import { ISignInDto, ITokenDto } from "@auth/domain/dto";
import { IRepository, ISignInUseCase } from "@auth/domain/ports";

@Injectable()
export class SignInUseCase implements ISignInUseCase {
  
  constructor(
    private readonly authRepository: IRepository
  ) {}

  async signin(body: ISignInDto): Promise<ITokenDto> {
    return await this.authRepository.signin(body);
  }

}