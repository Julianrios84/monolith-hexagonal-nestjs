import { ICreateUserDto } from "./create.interface.dto";

export interface IUpdateUserDto extends Omit<ICreateUserDto, "password"> {
  password?: string;
}
