import { IModelDto } from "@certifications/domain/dto";

export interface IUpdateDto extends Omit<IModelDto, "certification_id" | "user_id"> {
  
}