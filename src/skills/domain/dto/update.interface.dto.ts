import { IModelDto } from "@skills/domain/dto";

export interface IUpdateDto extends Omit<IModelDto, "skill_id" | "user_id"> {
  
}