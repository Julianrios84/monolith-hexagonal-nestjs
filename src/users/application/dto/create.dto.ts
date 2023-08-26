import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiSchema } from "@common/application/decorators";
import { ICreateDto } from "@users/domain/dto";

@ApiSchema({ name: 'UserCreateDto' })
export class CreateDto implements ICreateDto {

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

