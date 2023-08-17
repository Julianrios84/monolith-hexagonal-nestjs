import { IModelDto } from "@courses/domain/dto";

export interface ICreateDto extends Omit<IModelDto, "course_id" | "user_id"> {
  
}