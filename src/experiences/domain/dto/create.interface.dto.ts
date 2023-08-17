import { IModelDto } from "@experiences/domain/dto";

export interface ICreateDto extends Omit<IModelDto, "experience_id" | "user_id"> {
  
}