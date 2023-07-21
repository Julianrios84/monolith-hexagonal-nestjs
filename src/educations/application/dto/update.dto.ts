import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { ApiSchema } from "src/common/application/decorators";
import { IUpdateDto } from "src/educations/domain/dto";

@ApiSchema({ name: 'EducationUpdateDto' })
export class UpdateDto implements IUpdateDto {
  
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  institution: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  degree: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  field_of_study: string;

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