import { IModelDto } from "@personals/domain/dto";

export interface IGetDto  extends Omit<IModelDto, "personal_id"> {
  id: string;
}