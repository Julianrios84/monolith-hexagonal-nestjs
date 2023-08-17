import { Module } from '@nestjs/common';
import { Connection } from '@common/domain/constants';
import { IUUIDService } from '@common/domain/adapters';
import { UUIDService } from '@common/application/adapters';
import { CONFIG_DATABASE_MONGO_ENTITY } from '@common/infrastructure/database';

import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindInUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from '@educations/domain/ports';

import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindInUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from '@educations/application/usecases';
import { EducationProfile } from '@educations/application/adapters';
import { EducationService } from '@educations/application/services';

import { Education } from '@educations/infrastructure/entities/mongo';
import { MongoEducationRepository } from '@educations/infrastructure/repository';
import { EducationController } from '@educations/infrastructure/education.controller';

@Module({
  controllers: [EducationController],
  imports: [
    CONFIG_DATABASE_MONGO_ENTITY(Education, Connection.education.name),
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
    {
      provide: IUUIDService,
      useClass: UUIDService,
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
export class MongoModule {}
