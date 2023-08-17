import { IModelDto } from "@curriculums/domain/dto";

export interface ICreateDto extends Omit<IModelDto, "curriculum_id" | "user_id"> {
  
}