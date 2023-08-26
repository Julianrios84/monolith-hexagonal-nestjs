import { IModelDto } from "./model.interface.dto";

export interface IGetDto extends Omit<IModelDto,  "password"| "user_id"> {
  id: string
}