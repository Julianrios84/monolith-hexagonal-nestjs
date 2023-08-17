import { ISignUpDto, ITokenDto } from "@auth/domain/dto";

export abstract class ISignUpUseCase {
  abstract signup(body: ISignUpDto): Promise<ITokenDto>;
}