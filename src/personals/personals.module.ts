import { Module } from '@nestjs/common';
import { PersonalController } from './infrastructure/personal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalService } from './application/services';
import { Connection } from 'src/common/domain/constants';
import { DataPersonalSchema } from './infrastructure/entities';
import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from './domain/ports';
import { MongoPersonalRepository } from './infrastructure/repository';
import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from './application/usecases';
import { InfoPersonalProfile } from './application/adapters';

@Module({
  controllers: [PersonalController],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Connection.personals.collection,
          schema: DataPersonalSchema,
        },
      ],
      Connection.personals.name,
    ),
  ],
  providers: [
    PersonalService,
    {
      provide: IRepository,
      useClass: MongoPersonalRepository,
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
    InfoPersonalProfile,
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MongoPersonalRepository,
    },
  ],
})
export class PersonalsModule {}
