import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ISignInDto } from "src/auth/domain/dto";

export class SignInDto implements ISignInDto {
  
  
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}