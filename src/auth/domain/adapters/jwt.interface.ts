import { IPayloadDto } from "../dto/payload.interface.dto";

export abstract class IJwtService {
  abstract checkToken(token: string): Promise<boolean>;
  abstract createToken(payload: IPayloadDto): Promise<string>;
}