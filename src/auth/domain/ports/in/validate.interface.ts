import { IPayloadDto } from "../../dto";

export abstract class IValidateUseCase {
  abstract validate(payload: IPayloadDto): Promise<IPayloadDto | null>;

}