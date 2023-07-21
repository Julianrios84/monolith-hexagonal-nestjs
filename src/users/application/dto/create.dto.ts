import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiSchema } from "src/common/application/decorators";
import { ICreateUserDto } from "src/users/domain/dto";


@ApiSchema({ name: 'UserCreateDto' })
export class CreateDto implements ICreateUserDto {

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

