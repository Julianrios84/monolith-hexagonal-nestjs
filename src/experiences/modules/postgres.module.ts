import { Module } from '@nestjs/common';
import { Connection } from '@common/domain/constants';
import { IUUIDService } from '@common/domain/adapters';
import { UUIDService } from '@common/application/adapters';
import { CONFIG_DATABASE_POSTGRES_ENTITY } from '@common/infrastructure/database';

import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindInUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from '@experiences/domain/ports';

import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindInUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from '@experiences/application/usecases';
import { ExperienceProfile } from '@experiences/application/adapters';
import { ExperienceService } from '@experiences/application/services';

import { Experience } from '@experiences/infrastructure/entities/postgres';
import { PostgresExperienceRepository } from '@experiences/infrastructure/repository';
import { ExperienceController } from '@experiences/infrastructure/experience.controller';

@Module({
  controllers: [ExperienceController],
  imports: [
    CONFIG_DATABASE_POSTGRES_ENTITY(Experience, Connection.experience.name),
  ],
  providers: [
    ExperienceService,
    {
      provide: IRepository,
      useClass: PostgresExperienceRepository
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
    ExperienceProfile,
  ],
  exports: [
    {
      provide: IRepository,
      useClass: PostgresExperienceRepository

    },
  ],
})
export class PostgresModule {}
