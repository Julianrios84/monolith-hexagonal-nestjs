import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {  IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ApiSchema } from "@common/application/decorators";
import { IGetDto } from "@projects/domain/dto";


@ApiSchema({ name: 'ProjectGetDto' })
export class GetDto implements IGetDto {

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;
  
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly user_id: string;

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