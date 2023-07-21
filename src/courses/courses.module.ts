import { Module } from '@nestjs/common';
import { CourseController } from './infrastructure/course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'src/common/domain/constants';
import { CourseSchema } from './infrastructure/entities';
import { CourseService } from './application/services';
import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindInUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from './domain/ports';
import { MongoCourseRepository } from './infrastructure/repository';
import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindInUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from './application/usecases';
import { CourseProfile } from './application/adapters';

@Module({
  controllers: [CourseController],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Connection.courses.collection,
          schema: CourseSchema,
        },
      ],
      Connection.courses.name,
    ),
  ],
  providers: [
    CourseService,
    {
      provide: IRepository,
      useClass: MongoCourseRepository,
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
    CourseProfile,
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MongoCourseRepository,
    },
  ],
})
export class CoursesModule {}
