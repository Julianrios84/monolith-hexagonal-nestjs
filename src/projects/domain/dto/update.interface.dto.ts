import { IModelDto } from "@projects/domain/dto";

export interface IUpdateDto extends Omit<IModelDto, "project_id" | "user_id"> {
  
}