import { IsEmail, IsString, IsUUID } from "class-validator";
import { IGetDto } from "@users/domain/dto";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('UserGetType')
export class GetType implements IGetDto {
  
  @Field(() => ID)
  @IsUUID()
  readonly id: string;

  @Field(() => String)
  @IsEmail()
  readonly email: string;

  @Field(() => String)
  @IsString()
  readonly username: string;

}
