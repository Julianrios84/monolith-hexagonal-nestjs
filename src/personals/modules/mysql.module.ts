import { Module } from '@nestjs/common';
import { Connection } from '@common/domain/constants';
import { IUUIDService } from '@common/domain/adapters';
import { UUIDService } from '@common/application/adapters';
import { CONFIG_DATABASE_MYSQL_ENTITY } from '@common/infrastructure/database';

import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from '@personals/domain/ports';

import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from '@personals/application/usecases';
import { InfoPersonalProfile } from '@personals/application/adapters';
import { PersonalService } from '@personals/application/services';

import { DataPersonal } from '@personals/infrastructure/entities/mysql';
import { MySQLPersonalRepository } from '@personals/infrastructure/repository';
import { PersonalController } from '@personals/infrastructure/personal.controller';

@Module({
  controllers: [PersonalController],
  imports: [
    CONFIG_DATABASE_MYSQL_ENTITY(DataPersonal, Connection.personal.name),
  ],
  providers: [
    PersonalService,
    {
      provide: IRepository,
      useClass: MySQLPersonalRepository,
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
      provide: IUUIDService,
      useClass: UUIDService,
    },
    InfoPersonalProfile,
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MySQLPersonalRepository,
    },
  ],
})
export class MySQLModule {}
