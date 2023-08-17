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
} from '@projects/domain/ports';

import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindInUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from '@projects/application/usecases';
import { ProjectProfile } from '@projects/application/adapters';
import { ProjectService } from '@projects/application/services';

import { Project } from '@projects/infrastructure/entities/mongo';
import { MongoProjectRepository } from '@projects/infrastructure/repository';
import { ProjectController } from '@projects/infrastructure/project.controller';

@Module({
  controllers: [ProjectController],
  imports: [
    CONFIG_DATABASE_MONGO_ENTITY(
      Project,
      Connection.project.name,
    ),
  ],
  providers: [
    ProjectService,
    ProjectProfile,
    {
      provide: IRepository,
      useClass: MongoProjectRepository,
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
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MongoProjectRepository,
    },
  ],
})
export class MongoModule {}
