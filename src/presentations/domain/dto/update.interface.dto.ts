import { IModelDto } from "@presentations/domain/dto";

export interface IUpdateDto extends Omit<IModelDto, "presentation_id" | "user_id"> {
  
}