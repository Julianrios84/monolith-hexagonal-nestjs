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
} from '@certifications/domain/ports';

import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindInUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from '@certifications/application/usecases';
import { CertificationProfile } from '@certifications/application/adapters';
import { CertificationService } from '@certifications/application/services';

import { Certification } from '@certifications/infrastructure/entities/mysql';
import { MySQLCertificationRepository } from '@certifications/infrastructure/repository';
import { CertificationController } from '@certifications/infrastructure/certification.controller';

@Module({
  controllers: [CertificationController],
  imports: [
    CONFIG_DATABASE_MYSQL_ENTITY(Certification, Connection.certification.name),
  ],
  providers: [
    CertificationService,
    {
      provide: IRepository,
      useClass: MySQLCertificationRepository,
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
    CertificationProfile,
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MySQLCertificationRepository,
    },
  ],
})
export class MySQLModule {}
