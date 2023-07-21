import { IModelDto } from "./model.interface.dto";

export interface ICreateDto extends Omit<IModelDto, "id"> {
  
}