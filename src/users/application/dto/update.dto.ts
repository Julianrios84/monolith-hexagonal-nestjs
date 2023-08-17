import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiSchema } from "@common/application/decorators";
import { IUpdateDto } from "@users/domain/dto";


@ApiSchema({ name: 'UserUpdateDto' })
export class UpdateDto implements IUpdateDto {

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
  @IsOptional()
  @IsString()
  readonly password: string;
}

