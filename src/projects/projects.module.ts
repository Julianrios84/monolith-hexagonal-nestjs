import { Module } from '@nestjs/common';
import { ProjectController } from './infrastructure/project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './infrastructure/entities';
import { Connection } from 'src/common/domain/constants';
import { ProjectService } from './application/services';
import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindInUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from './domain/ports';
import { MongoProjectRepository } from './infrastructure/repository';
import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindInUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from './application/usecases';
import { ProjectProfile } from './application/adapters';

@Module({
  controllers: [ProjectController],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Connection.projects.collection,
          schema: ProjectSchema,
        },
      ],
      Connection.projects.name,
    ),
  ],
  providers: [
    ProjectService,
    {
      provide: IRepository,
      useClass: MongoProjectRepository,
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
    ProjectProfile,
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MongoProjectRepository,
    },
  ],
})
export class ProjectsModule {}
