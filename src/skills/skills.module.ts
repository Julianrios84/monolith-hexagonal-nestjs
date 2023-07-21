import { Module } from '@nestjs/common';
import { SkillController } from './infrastructure/skill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'src/common/domain/constants';
import { SkillSchema } from './infrastructure/entities';
import { SkillService } from './application/services';
import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindInUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from './domain/ports';
import { MongoSkillRepository } from './infrastructure/repository';
import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindInUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from './application/usecases';
import { SkillProfile } from './application/adapters';

@Module({
  controllers: [SkillController],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Connection.skill.collection,
          schema: SkillSchema,
        },
      ],
      Connection.skill.name,
    ),
  ],
  providers: [
    SkillService,
    {
      provide: IRepository,
      useClass: MongoSkillRepository,
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
    SkillProfile,
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MongoSkillRepository,
    },
  ],
})
export class SkillsModule {}
