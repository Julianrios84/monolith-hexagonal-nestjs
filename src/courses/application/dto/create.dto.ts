import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiSchema } from "src/common/application/decorators";
import { ICreateDto } from "src/courses/domain/dto";

@ApiSchema({ name: 'CourseCreateDto' })
export class CreateDto implements ICreateDto {

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
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