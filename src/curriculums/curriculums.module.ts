import { Module } from '@nestjs/common';
import { CurriculumController } from './infrastructure/curriculum.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'src/common/domain/constants';
import { CurriculumSchema } from './infrastructure/entities';
import { CurriculumService } from './application/services';
import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindActiveUseCase,
  IFindAllUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from './domain/ports';
import { MongoCurriculumRepository } from './infrastructure/repository';
import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindOneUseCase,
  FindActiveUseCase,
  UpdateUseCase,
} from './application/usecases';
import { CurriculumProfile } from './application/adapters';

@Module({
  controllers: [CurriculumController],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Connection.curriculums.collection,
          schema: CurriculumSchema,
        },
      ],
      Connection.curriculums.name,
    ),
  ],
  providers: [
    CurriculumService,
    {
      provide: IRepository,
      useClass: MongoCurriculumRepository,
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
      provide: IFindActiveUseCase,
      useClass: FindActiveUseCase,
    },
    CurriculumProfile,
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MongoCurriculumRepository,
    },
  ],
})
export class CurriculumsModule {}
