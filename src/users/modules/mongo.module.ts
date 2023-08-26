import { Module } from '@nestjs/common';
import { Connection } from '@common/domain/constants';
import { IBcryptService, IUUIDService } from '@common/domain/adapters';
import { BcryptService, UUIDService } from '@common/application/adapters';
import { 
  CONFIG_DATABASE_MONGO_ENTITY
} from '@common/infrastructure/database';

import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindByUsernameUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from '@users/domain/ports';
import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindByUsernameUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from '@users/application/usecases';

import { UserService } from '@users/application/services';
import { UserProfile } from '@users/application/adapters';
import { User } from '@users/infrastructure/entities/mongo';
import { 
  MongoUserRepository, 
} from '@users/infrastructure/repository';
import { UserController } from '@users/infrastructure/user.controller';
import { UserResolver } from '@users/infrastructure/user.resolver';


@Module({
  controllers: [UserController],
  imports: [
    CONFIG_DATABASE_MONGO_ENTITY( User, Connection.user.name),
  ],
  providers: [
    UserResolver,
    UserService,
    UserProfile,
    {
      provide: IRepository,
      useClass: MongoUserRepository,
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
      provide: IFindByUsernameUseCase,
      useClass: FindByUsernameUseCase,
    },
    {
      provide: IBcryptService,
      useClass: BcryptService,
    },
    {
      provide: IUUIDService,
      useClass: UUIDService
    }
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MongoUserRepository,
    },
  ],
})
export class MongoModule {}
