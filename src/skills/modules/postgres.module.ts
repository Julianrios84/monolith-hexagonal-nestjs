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
} from '@skills/domain/ports';

import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindInUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from '@skills/application/usecases';
import { SkillProfile } from '@skills/application/adapters';
import { SkillService } from '@skills/application/services';

import { Skill } from '@skills/infrastructure/entities/postgres';
import { SkillController } from '@skills/infrastructure/skill.controller';
import { PostgresSkillRepository } from '@skills/infrastructure/repository';

@Module({
  controllers: [SkillController],
  imports: [
    CONFIG_DATABASE_POSTGRES_ENTITY(Skill, Connection.skill.name),
  ],
  providers: [
    SkillService,
    SkillProfile,
    {
      provide: IRepository,
      useClass: PostgresSkillRepository,
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
      useClass: PostgresSkillRepository,
    },
  ],
})
export class PostgresModule {}
