import { IModelDto } from "@personals/domain/dto";

export interface ICreateDto extends Omit<IModelDto, "personal_id" | "user_id"> {
  
}