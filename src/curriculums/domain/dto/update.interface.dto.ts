import { IModelDto } from "@curriculums/domain/dto";

export interface IUpdateDto extends Omit<IModelDto, "curriculum_id" | "user_id"> {
  
}