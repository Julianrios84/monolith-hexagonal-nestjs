import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { IGetDto } from "@certifications/domain/dto";
import { ApiSchema } from "@common/application/decorators";


@ApiSchema({ name: 'CertificationGetDto' })
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