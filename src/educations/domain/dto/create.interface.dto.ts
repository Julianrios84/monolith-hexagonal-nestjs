import { IModelDto } from "@educations/domain/dto";

export interface ICreateDto extends Omit<IModelDto, "education_id" | "user_id"> {
  
}