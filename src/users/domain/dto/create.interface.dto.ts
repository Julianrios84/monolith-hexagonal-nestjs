import { IModelDto } from "./model.interface.dto";

export interface ICreateUserDto extends Omit<IModelDto, "id"> {
}