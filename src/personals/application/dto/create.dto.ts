import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ApiSchema } from "@common/application/decorators";
import { ICreateDto } from "@personals/domain/dto";


@ApiSchema({ name: 'PersonalCreateDto' })
export class CreateDto implements ICreateDto {
  

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly country: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly resume: string;

}