import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { ApiSchema } from "src/common/application/decorators";
import { IGetDto } from "src/experiences/domain/dto";


@ApiSchema({ name: 'ExperienceGetDto' })
export class GetDto implements IGetDto {

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  company: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  finish_date: Date;

}