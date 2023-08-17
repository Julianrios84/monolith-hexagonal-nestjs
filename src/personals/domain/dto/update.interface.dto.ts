import { IModelDto } from "@personals/domain/dto";

export interface IUpdateDto extends Omit<IModelDto, "personal_id" | "user_id"> {
  
}