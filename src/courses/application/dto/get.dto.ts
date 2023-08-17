import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiSchema } from "@common/application/decorators";
import { IGetDto } from "@courses/domain/dto";

@ApiSchema({ name: 'CourseGetDto' })
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
  readonly title: string
  
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly supplier: string
  
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string
  
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly duration: string
  
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly url: string

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly qualification: number

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tags: string[]

}