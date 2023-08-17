import { IModelDto } from "@skills/domain/dto";

export interface IGetDto  extends Omit<IModelDto, "skill_id"> {
  id: string
}