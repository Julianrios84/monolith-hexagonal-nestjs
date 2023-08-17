import { Module } from '@nestjs/common';
import { Connection } from '@common/domain/constants';
import { IUUIDService } from '@common/domain/adapters';
import { UUIDService } from '@common/application/adapters';
import { CONFIG_DATABASE_MONGO_ENTITY } from '@common/infrastructure/database';

import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindActiveUseCase,
  IFindAllUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from '@curriculums/domain/ports';

import {
  CreateUseCase,
  DeleteUseCase,
  FindActiveUseCase,
  FindAllUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from '@curriculums/application/usecases';
import { CurriculumProfile } from '@curriculums/application/adapters';
import { CurriculumService } from '@curriculums/application/services';

import { Curriculum } from '@curriculums/infrastructure/entities/mongo';
import { MongoCurriculumRepository } from '@curriculums/infrastructure/repository';
import { CurriculumController } from '@curriculums/infrastructure/curriculum.controller';

@Module({
  controllers: [CurriculumController],
  imports: [
    CONFIG_DATABASE_MONGO_ENTITY(Curriculum, Connection.curriculum.name),
  ],
  providers: [
    CurriculumService,
    {
      provide: IRepository,
      useClass: MongoCurriculumRepository,
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
      provide: IFindActiveUseCase,
      useClass: FindActiveUseCase,
    },
    {
      provide: IUUIDService,
      useClass: UUIDService,
    },
    CurriculumProfile,
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MongoCurriculumRepository,
    },
  ],
})
export class MongoModule {}
