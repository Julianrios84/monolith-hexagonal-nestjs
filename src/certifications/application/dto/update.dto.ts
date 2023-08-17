import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { IUpdateDto } from "@certifications/domain/dto";
import { ApiSchema } from "@common/application/decorators";


@ApiSchema({ name: 'CertificationUpdateDto' })
export class UpdateDto implements IUpdateDto {

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly institution: string;

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