import { IModelDto } from "@educations/domain/dto";

export interface IGetDto  extends Omit<IModelDto, "education_id"> {
  id: string
}