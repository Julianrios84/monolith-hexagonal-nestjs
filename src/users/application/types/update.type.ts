import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IUpdateDto } from "@users/domain/dto";
import { InputType, Field } from '@nestjs/graphql';

@InputType('UserUpdateType')
export class UpdateType implements IUpdateDto {

  @Field( () => String, { nullable: false })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Field( () => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  
  @Field( () => String, { nullable: true })
  @IsOptional()
  @IsString()
  readonly password: string;
}

