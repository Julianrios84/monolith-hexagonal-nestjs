import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { Connection } from '@common/domain/constants';
import { JwtStrategy } from '@auth/root/infrastructure/strategy/jwt.strategy';
import { IBcryptService, IUUIDService } from '@common/domain/adapters';
import { BcryptService, UUIDService } from '@common/application/adapters';
import { CONFIG_DATABASE_MYSQL_ENTITY } from '@common/infrastructure/database';

import { IJwtService } from '@auth/domain/adapters';
import {
  IRepository,
  ISignInUseCase,
  ISignUpUseCase,
  IValidateUseCase,
} from '@auth/domain/ports';

import {
  SignInUseCase,
  SignUpUseCase,
  ValidateUseCase,
} from '@auth/application/usecases';
import { AuthProfile, JwtTokenService } from '@auth/application/adapters';
import { AuthService } from '@auth/application/services';

import { User } from '@auth/infrastructure/entities/mysql';
import { MySQLAuthRepository } from '@auth/infrastructure/repository';
import { AuthController } from '@auth/infrastructure/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    CONFIG_DATABASE_MYSQL_ENTITY(User, Connection.auth.name),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_EXPIRES_IN,
          },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    AuthProfile,
    JwtStrategy,
    {
      provide: IRepository,
      useClass: MySQLAuthRepository,
    },
    {
      provide: ISignInUseCase,
      useClass: SignInUseCase,
    },
    {
      provide: ISignUpUseCase,
      useClass: SignUpUseCase,
    },
    {
      provide: IValidateUseCase,
      useClass: ValidateUseCase,
    },
    {
      provide: IBcryptService,
      useClass: BcryptService,
    },
    {
      provide: IJwtService,
      useClass: JwtTokenService,
    },
    {
      provide: IUUIDService,
      useClass: UUIDService,
    },
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MySQLAuthRepository,
    },
    PassportModule,
    JwtModule,
    JwtStrategy,
  ],
})
export class MySQLModule {}
