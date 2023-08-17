import { IDeleteDto } from "@certifications/domain/dto";

export abstract class IDeleteUseCase {
  abstract delete(user_id: string, id: string): Promise<IDeleteDto>;
}