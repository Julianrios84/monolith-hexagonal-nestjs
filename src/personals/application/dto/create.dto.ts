import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ApiSchema } from "src/common/application/decorators";
import { ICreateDto } from "src/personals/domain/dto";


@ApiSchema({ name: 'PersonalCreateDto' })
export class CreateDto implements ICreateDto {
  
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  resume: string;
  



}