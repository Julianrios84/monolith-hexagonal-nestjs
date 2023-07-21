import { IModelDto } from "./model.interface.dto";

export interface IUpdateDto extends Omit<IModelDto, "id"> {
  
}