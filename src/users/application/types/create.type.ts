import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ICreateDto } from "@users/domain/dto";
import { InputType, Field } from '@nestjs/graphql';

@InputType('UserCreateType')
export class CreateType implements ICreateDto {

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

