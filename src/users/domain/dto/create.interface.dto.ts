import { IModelDto } from "@users/domain/dto";

export interface ICreateDto extends Omit<IModelDto, "user_id"> {
}