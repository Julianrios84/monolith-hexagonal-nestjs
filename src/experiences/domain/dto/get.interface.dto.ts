import { IModelDto } from "@experiences/domain/dto";

export interface IGetDto  extends Omit<IModelDto, "experience_id"> {
  id: string;
}