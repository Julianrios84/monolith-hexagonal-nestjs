import { IDeleteDto } from "../../dto";

export abstract class IDeleteUseCase {
  abstract delete(id: string): Promise<IDeleteDto>;
}