import { IModelDto } from "@presentations/domain/dto";

export interface ICreateDto extends Omit<IModelDto, "presentation_id" | "user_id"> {
  
}