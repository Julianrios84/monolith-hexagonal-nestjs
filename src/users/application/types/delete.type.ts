import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IDeleteDto } from "@users/domain/dto";
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('UserDeleteType')
export class DeleteType implements IDeleteDto {

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  readonly status: number;

  @Field(() => String)
  @IsNotEmpty()  
  @IsString()
  readonly message: string;
}