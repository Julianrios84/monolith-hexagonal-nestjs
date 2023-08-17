import { IModelDto } from "@projects/domain/dto";

export interface IGetDto  extends Omit<IModelDto, "project_id"> {
  id: string;
}