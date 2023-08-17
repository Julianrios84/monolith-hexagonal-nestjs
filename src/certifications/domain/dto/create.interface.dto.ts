import { IModelDto } from "@certifications/domain/dto";

export interface ICreateDto extends Omit<IModelDto, "certification_id" | "user_id"> {
  
}