import { ISignInDto } from "./signin.interface.dto";

export interface ISignUpDto extends ISignInDto {
  username: string
}