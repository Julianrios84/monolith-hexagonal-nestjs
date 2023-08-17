import { IModelDto } from "@courses/domain/dto";

export interface IGetDto  extends Omit<IModelDto, "course_id"> {
  id: string
}