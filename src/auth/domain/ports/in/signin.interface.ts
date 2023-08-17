import { ISignInDto, ITokenDto } from "@auth/domain/dto";

export abstract class ISignInUseCase {
  abstract signin(body: ISignInDto): Promise<ITokenDto>;
}