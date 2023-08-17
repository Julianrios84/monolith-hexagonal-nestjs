import { Module } from '@nestjs/common';
import { Connection } from '@common/domain/constants';
import { IUUIDService } from '@common/domain/adapters';
import { UUIDService } from '@common/application/adapters';
import { CONFIG_DATABASE_MYSQL_ENTITY } from '@common/infrastructure/database';

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

import { Skill } from '@skills/infrastructure/entities/mysql';
import { MySQLSkillRepository } from '@skills/infrastructure/repository';
import { SkillController } from '@skills/infrastructure/skill.controller';

@Module({
  controllers: [SkillController],
  imports: [CONFIG_DATABASE_MYSQL_ENTITY(Skill, Connection.skill.name)],
  providers: [
    SkillService,
    SkillProfile,
    {
      provide: IRepository,
      useClass: MySQLSkillRepository,
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
      useClass: MySQLSkillRepository,
    },
  ],
})
export class MySQLModule {}
