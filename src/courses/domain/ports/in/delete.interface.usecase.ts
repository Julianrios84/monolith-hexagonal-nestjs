import { IDeleteDto } from "@courses/domain/dto";

export abstract class IDeleteUseCase {
  abstract delete(user_id: string, id: string): Promise<IDeleteDto>;
}