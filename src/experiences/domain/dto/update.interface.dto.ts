import { IModelDto } from "@experiences/domain/dto";

export interface IUpdateDto extends Omit<IModelDto, "experience_id" | "user_id"> {
  
}