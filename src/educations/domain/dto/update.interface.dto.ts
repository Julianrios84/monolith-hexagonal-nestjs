import { IModelDto } from "@educations/domain/dto";

export interface IUpdateDto extends Omit<IModelDto, "education_id" | "user_id"> {
  
}