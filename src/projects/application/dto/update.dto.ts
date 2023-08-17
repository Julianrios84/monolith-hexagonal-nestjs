import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiSchema } from "@common/application/decorators";
import { IUpdateDto } from "@projects/domain/dto";


@ApiSchema({ name: 'ProjectUpdateDto' })
export class UpdateDto implements IUpdateDto {

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

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
  
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly role: string;

}