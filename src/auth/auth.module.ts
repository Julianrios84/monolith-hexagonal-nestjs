import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'src/common/domain/constants';
import { UserSchema } from './infrastructure/entities';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './application/services';
import { AuthProfile, JwtTokenService } from './application/adapters';
import { IRepository, ISignInUseCase, ISignUpUseCase, IValidateUseCase } from './domain/ports';
import { MongoAuthRepository } from './infrastructure/repository';
import { SignInUseCase, SignUpUseCase, ValidateUseCase } from './application/usecases';
import { IBcryptService } from 'src/common/domain/adapters';
import { BcryptService } from 'src/common/application/adapters';
import { IJwtService } from './domain/adapters';
import { AuthController } from './infrastructure/auth.controller';
import { JwtStrategy } from 'src/common/infrastructure/strategy/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Connection.user.collection,
        schema: UserSchema,
      },
    ], Connection.user.name),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_EXPIRES_IN
          }
        }
      }
    }),
  ],
  providers: [
    AuthService,
    AuthProfile,
    JwtStrategy,
    {
      provide: IRepository,
      useClass: MongoAuthRepository,
    },
    {
      provide: ISignInUseCase,
      useClass: SignInUseCase
    },
    {
      provide: ISignUpUseCase,
      useClass: SignUpUseCase
    },
    {
      provide: IValidateUseCase,
      useClass: ValidateUseCase
    },
    {
      provide: IBcryptService,
      useClass: BcryptService,
    },
    {
      provide: IJwtService,
      useClass: JwtTokenService
    },
   
  ],
  exports: [
    {
      provide: IRepository,
      useClass: MongoAuthRepository,
    },
    PassportModule, JwtModule,  JwtStrategy
  ]
})
export class AuthModule {}
