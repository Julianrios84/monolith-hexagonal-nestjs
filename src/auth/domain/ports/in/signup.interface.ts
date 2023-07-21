import { ISignUpDto, ITokenDto } from "../../dto";

export abstract class ISignUpUseCase {
  abstract signup(body: ISignUpDto): Promise<ITokenDto>;
}