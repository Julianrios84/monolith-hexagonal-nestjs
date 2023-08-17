import { IModelDto } from "@curriculums/domain/dto";

export interface IGetDto  extends Omit<IModelDto, "curriculum_id"> {
  id: string;
}