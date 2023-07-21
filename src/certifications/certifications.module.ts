import { Module } from '@nestjs/common';
import { CertificationController } from './infrastructure/certification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CertificationSchema } from './infrastructure/entities';
import { Connection } from 'src/common/domain/constants';
import { CertificationService } from './application/services';
import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindInUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from './domain/ports';
import { MongoCertificationRepository } from './infrastructure/repository';
import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindInUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from './application/usecases';
import { CertificationProfile } from './application/adapters';

@Module({
  controllers: [CertificationController],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Connection.certifications.collection,
          schema: CertificationSchema,
        },
      ],
      Connection.certifications.name,
    ),
  ],
  providers: [
    CertificationService,
    {
      provide: IRepository,
      useClass: MongoCertificationRepository,
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
    CertificationProfile,
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MongoCertificationRepository,
    },
  ],
})
export class CertificationsModule {}
