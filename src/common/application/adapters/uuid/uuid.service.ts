import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { IUUIDService } from '@common/domain/adapters/uuid.interface';


@Injectable()
export class UUIDService implements IUUIDService {
  async create(): Promise<string> {
    return await uuidv4()
  }

}
