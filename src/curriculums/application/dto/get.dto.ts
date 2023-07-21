import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiSchema } from "src/common/application/decorators";
import { IGetDto } from "src/curriculums/domain/dto";

@ApiSchema({ name: 'CurriculumGetDto' })
export class GetDto implements IGetDto {

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
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
  readonly title: string
  
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly datapersonal: string
  
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly educations: string[]
  
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly workexperies: string[]
  
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly skills: string[]
  
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly certifications: string[]
  
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly courses: string[]
  
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly projects: string[]
  
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  readonly presentation: string

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly status: boolean

}