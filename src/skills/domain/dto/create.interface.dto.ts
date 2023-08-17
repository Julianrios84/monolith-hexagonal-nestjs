import { IModelDto } from "@skills/domain/dto";

export interface ICreateDto extends Omit<IModelDto, "skill_id" | "user_id"> {
  
}