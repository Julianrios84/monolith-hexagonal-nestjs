import { Module } from '@nestjs/common';
import { EducationController } from './infrastructure/education.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'src/common/domain/constants';
import { EducationSchema } from './infrastructure/entities';
import { EducationService } from './application/services';
import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindInUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from './domain/ports';
import { MongoEducationRepository } from './infrastructure/repository';
import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindInUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from './application/usecases';
import { EducationProfile } from './application/adapters';

@Module({
  controllers: [EducationController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Connection.educations.collection,
        schema: EducationSchema,
      },
    ], Connection.educations.name),
  ],
  providers: [
    EducationService,
    {
      provide: IRepository,
      useClass: MongoEducationRepository,
    },
    {
      provide: ICreateUseCase,
      useClass: CreateUseCase,
    },
    {
      provide: IUpdateUseCase,
      useClass: UpdateUseCase,
    },
    {
      provide: IDeleteUseCase,
      useClass: DeleteUseCase,
    },
    {
      provide: IFindAllUseCase,
      useClass: FindAllUseCase,
    },
    {
      provide: IFindOneUseCase,
      useClass: FindOneUseCase,
    },
    {
      provide: IFindInUseCase,
      useClass: FindInUseCase,
    },
    EducationProfile,
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MongoEducationRepository,
    },
  ],
})
export class EducationsModule {}
