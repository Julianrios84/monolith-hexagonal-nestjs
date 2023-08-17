import { IModelDto } from "@presentations/domain/dto";

export interface IGetDto  extends Omit<IModelDto, "presentation_id"> {
  id: string;
}