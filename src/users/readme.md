# Users Module V2


``` js
import { DynamicModule, Module } from '@nestjs/common';
import { MongoModule, MySQLModule, PostgresModule } from '@users/modules/index';
import { UserController } from './infrastructure/user.controller';
import {
  CONFIG_DATABASE_MONGO_ENTITY,
  CONFIG_DATABASE_MYSQL_ENTITY,
  CONFIG_DATABASE_POSTGRES_ENTITY,
} from '@common/root/infrastructure/database';
import { Connection } from '@common/root/domain/constants';
import { UserSchema } from '@users/infrastructure/entities/mongo';
import { ICreateUseCase, IDeleteUseCase, IFindAllUseCase, IFindByUsernameUseCase, IFindOneUseCase, IRepository, IUpdateUseCase } from './domain/ports';
import {
  MongoUserRepository,
  MySQLUserRepository,
  PostgresUserRepository,
} from './infrastructure/repository';
import { User as UserMySQL } from '@users/infrastructure/entities/mysql';
import { User as UserPostgres } from '@users/infrastructure/entities/postgres';
import { UserService } from './application/services';
import { UserProfile } from './application/adapters';
import { CreateUseCase, DeleteUseCase, FindAllUseCase, FindByUsernameUseCase, FindOneUseCase, UpdateUseCase } from './application/usecases';
import { IBcryptService, IUUIDService } from '@common/root/domain/adapters';
import { BcryptService, UUIDService } from '@common/root/application/adapters';

@Module({})
export class UsersModule {
  static register(): DynamicModule {
    let config = null;

    switch (process.env.DB_PROVIDER) {
      case 'Mongo':
        config = {
          schema: CONFIG_DATABASE_MONGO_ENTITY(
            Connection.user.collection,
            UserSchema,
            Connection.user.name,
          ),
          repository: MongoUserRepository,
        };

        break;
      case 'MySQL':
        config = {
          schema: CONFIG_DATABASE_MYSQL_ENTITY(UserMySQL, Connection.user.name),
          repository: MySQLUserRepository,
        };
        break;
      case 'PostgreSQL':
        config = {
          schema: CONFIG_DATABASE_POSTGRES_ENTITY(
            UserPostgres,
            Connection.user.name,
          ),
          repository: PostgresUserRepository,
        };
        break;
    }

    return {
      module: UsersModule,
      controllers: [UserController],
      imports: [
        config.schema
      ],
      providers: [
        UserService,
        UserProfile,
        {
          provide: IRepository,
          useClass: config.repository,
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
        },
      ],
      exports: [
        {
          provide: IRepository,
          useClass: config.repository,
        },
      ],
    };
  }
}
```