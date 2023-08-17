import { Injectable } from "@nestjs/common";
import { IPayloadDto, ISignInDto, ISignUpDto, ITokenDto } from "@auth/domain/dto";
import { ISignInUseCase, ISignUpUseCase, IValidateUseCase } from "@auth/domain/ports";

@Injectable()
export class AuthService implements ISignInUseCase, ISignUpUseCase, IValidateUseCase  {

  constructor(
    private readonly signInUseCase: ISignInUseCase,
    private readonly signUpUseCase: ISignUpUseCase,
    private readonly validateUseCase: IValidateUseCase
  ) {}

  async validate(payload: IPayloadDto): Promise<IPayloadDto | null> {
    return await this.validateUseCase.validate(payload);
  }


  async signin(body: ISignInDto): Promise<ITokenDto> {
    return await this.signInUseCase.signin(body);
  }

  async signup(body: ISignUpDto): Promise<ITokenDto> {
    return await this.signUpUseCase.signup(body);
  }



}