import { ISignInDto } from "@auth/domain/dto";

export interface ISignUpDto extends ISignInDto {
  username: string
}