import { IPayloadDto } from "@auth/domain/dto";

export abstract class IValidateUseCase {
  abstract validate(payload: IPayloadDto): Promise<IPayloadDto | null>;

}