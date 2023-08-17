import { IModelDto } from "@courses/domain/dto";

export interface IUpdateDto extends Omit<IModelDto, "course_id" | "user_id"> {
  
}