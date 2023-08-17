import { IPayloadDto } from "@auth/domain/dto";

export abstract class IJwtService {
  abstract checkToken(token: string): Promise<boolean>;
  abstract createToken(payload: IPayloadDto): Promise<string>;
}