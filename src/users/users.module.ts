import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'src/common/domain/constants';
import { UserSchema } from './infrastructure/entities';
import { UserService } from './application/services';
import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindByUsernameUseCase,
  IFindOneUseCase,
  IRepository,
  IUpdateUseCase,
} from './domain/ports';
import { MongoUserRepository } from './infrastructure/repository';
import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindByUsernameUseCase,
  FindOneUseCase,
  UpdateUseCase,
} from './application/usecases';
import { IBcryptService } from 'src/common/domain/adapters';
import { BcryptService } from 'src/common/application/adapters';
import { UserProfile } from './application/adapters';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Connection.user.collection,
          schema: UserSchema,
        },
      ],
      Connection.user.name,
    ),
  ],
  providers: [
    UserService,
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
    UserProfile,
  ],

  exports: [
    {
      provide: IRepository,
      useClass: MongoUserRepository,
    },
  ],
})
export class UsersModule {}
