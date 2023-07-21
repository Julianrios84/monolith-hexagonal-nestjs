import { IPayloadDto, ISignInDto, ISignUpDto, ITokenDto } from "../../dto";

export abstract class IRepository {
  abstract signin(body: ISignInDto): Promise<ITokenDto>;
  abstract signup(body: ISignUpDto): Promise<ITokenDto>;
  abstract validate(payload: IPayloadDto): Promise<IPayloadDto | null>;
}