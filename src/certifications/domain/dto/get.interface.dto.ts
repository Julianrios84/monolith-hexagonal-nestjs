import { IModelDto } from "@certifications/domain/dto";

export interface IGetDto  extends Omit<IModelDto, "certification_id"> {
  id: string;
}