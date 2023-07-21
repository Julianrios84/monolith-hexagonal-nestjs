import { Module } from '@nestjs/common';
import { PresentationController } from './infrastructure/presentation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'src/common/domain/constants';
import { PresentationSchema } from './infrastructure/entities';
import { PresentationService } from './application/services';
import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from './domain/ports';
import { MongoPresentationRepository } from './infrastructure/repository';
import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from './application/usecases';
import { PresentationProfile } from './application/adapters';

@Module({
  controllers: [PresentationController],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Connection.presentations.collection,
          schema: PresentationSchema,
        },
      ],
      Connection.presentations.name,
    ),
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
    PresentationProfile,
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MongoPresentationRepository,
    },
  ],
})
export class PresentationsModule {}
