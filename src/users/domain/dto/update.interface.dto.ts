import { ICreateDto } from "@users/domain/dto";

export interface IUpdateDto extends Omit<ICreateDto, "password"> {
  password?: string;
}
