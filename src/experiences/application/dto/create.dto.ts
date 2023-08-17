import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ApiSchema } from "@common/application/decorators";
import { ICreateDto } from "@experiences/domain/dto";


@ApiSchema({ name: 'ExperienceCreateDto' })
export class CreateDto implements ICreateDto {

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly company: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

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