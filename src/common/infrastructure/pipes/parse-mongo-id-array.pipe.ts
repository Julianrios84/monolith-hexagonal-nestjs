import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { isValidObjectId, Types } from 'mongoose';

@Injectable()
export class ParseArrayMongoIdPipe implements PipeTransform {
  transform(value: string[], _metadata: ArgumentMetadata) {
    const response = []
    value.forEach((element, index) => {
      if (!isValidObjectId(element)) {
        throw new BadRequestException(`${index} - ${element} is not a valid Mongo Id`);
      }
      response.push(new Types.ObjectId(element))
    });
    return response;
  }
}