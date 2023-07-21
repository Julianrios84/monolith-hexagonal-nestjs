import { ISignInDto, ITokenDto } from "../../dto";

export abstract class ISignInUseCase {
  abstract signin(body: ISignInDto): Promise<ITokenDto>;
}