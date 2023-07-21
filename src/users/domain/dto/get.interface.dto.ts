import { IModelDto } from "./model.interface.dto";

export interface IGetUserDto extends Omit<IModelDto, "password"> {
}