import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiSchema } from '@common/application/decorators';
import { ICreateDto } from '@presentations/domain/dto';


@ApiSchema({ name: 'PresentationCreateDto' })
export class CreateDto implements ICreateDto {



  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly of_full_name: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly of_title: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly of_address: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly of_country: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly of_city: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly of_phone: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly of_email: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly to_full_name: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly to_email: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly to_company: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly to_address: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly to_city: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly to_country: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly greeting: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly date: Date;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly closing: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly signature: string;
}
