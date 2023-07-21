import { Module } from '@nestjs/common';
import { ExperienceController } from './infrastructure/experience.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'src/common/domain/constants';
import { WorkExperienceSchema } from './infrastructure/entities';
import { ExperienceService } from './application/services';
import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindInUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from './domain/ports';
import { MongoExperiencelRepository } from './infrastructure/repository';
import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindInUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from './application/usecases';
import { ExperienceProfile } from './application/adapters';

@Module({
  controllers: [ExperienceController],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Connection.experiences.collection,
          schema: WorkExperienceSchema,
        },
      ],
      Connection.experiences.name,
    ),
  ],
  providers: [
    ExperienceService,
    {
      provide: IRepository,
      useClass: MongoExperiencelRepository,
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
    ExperienceProfile,
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MongoExperiencelRepository,
    },
  ],
})
export class ExperiencesModule {}
