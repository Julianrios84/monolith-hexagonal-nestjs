import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ApiSchema } from "@common/application/decorators";
import { IGetDto } from "@educations/domain/dto";

@ApiSchema({ name: 'EducationGetDto' })
export class GetDto implements IGetDto {

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly user_id: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly institution: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly degree: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly field_of_study: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly start_date: Date;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly finish_date: Date;

}