import { Module } from '@nestjs/common';
import { Connection } from '@common/domain/constants';
import { IUUIDService } from '@common/domain/adapters';
import { UUIDService } from '@common/application/adapters';
import { CONFIG_DATABASE_MONGO_ENTITY } from '@common/infrastructure/database';

import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from '@presentations/domain/ports';

import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from '@presentations/application/usecases';
import { PresentationProfile } from '@presentations/application/adapters';
import { PresentationService } from '@presentations/application/services';

import { Presentation} from '@presentations/infrastructure/entities/mongo';
import { MongoPresentationRepository } from '@presentations/infrastructure/repository';
import { PresentationController } from '@presentations/infrastructure/presentation.controller';

@Module({
  controllers: [PresentationController],
  imports: [
    CONFIG_DATABASE_MONGO_ENTITY(Presentation, Connection.presentation.name),
  ],
  providers: [
    PresentationService,
    {
      provide: IRepository,
      useClass: MongoPresentationRepository,
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
      useClass: UUIDService
    },
    PresentationProfile,
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MongoPresentationRepository,
    },
  ],
})
export class MongoModule {}
