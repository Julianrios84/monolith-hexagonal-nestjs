import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiSchema } from "@common/application/decorators";
import { IGetDto } from "@curriculums/domain/dto";

@ApiSchema({ name: 'CurriculumGetDto' })
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
  @IsUUID()
  readonly datapersonal: string
  
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly educations: string[]
  
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly workexperies: string[]
  
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly skills: string[]
  
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly certifications: string[]
  
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly courses: string[]
  
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly projects: string[]
  
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  readonly presentation: string

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly status: boolean

}