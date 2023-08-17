import { IModelDto } from "@users/domain/dto";

export interface IGetDto extends Omit<IModelDto,  "password"| "user_id"> {
  id: string
}