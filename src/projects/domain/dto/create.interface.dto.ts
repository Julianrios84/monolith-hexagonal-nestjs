import { IModelDto } from "@projects/domain/dto";

export interface ICreateDto extends Omit<IModelDto, "project_id" | "user_id"> {
  
}