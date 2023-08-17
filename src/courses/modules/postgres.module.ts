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
} from '@courses/domain/ports';

import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindInUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from '@courses/application/usecases';
import { CourseProfile } from '@courses/application/adapters';
import { CourseService } from '@courses/application/services';

import { Course } from '@courses/infrastructure/entities/postgres';
import { PostgresCourseRepository } from '@courses/infrastructure/repository';
import { CourseController } from '@courses/infrastructure/course.controller';

@Module({
  controllers: [CourseController],
  imports: [
    CONFIG_DATABASE_POSTGRES_ENTITY(Course, Connection.course.name),
  ],
  providers: [
    CourseService,
    {
      provide: IRepository,
      useClass: PostgresCourseRepository,
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
    CourseProfile,
  ],
  exports: [
    {
      provide: IRepository,
      useClass: PostgresCourseRepository,
    },
  ],
})
export class PostgresModule {}
