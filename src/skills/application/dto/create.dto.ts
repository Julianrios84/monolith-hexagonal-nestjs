import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ApiSchema } from "@common/application/decorators";
import { ICreateDto } from "@skills/domain/dto";

@ApiSchema({ name: 'SkillCreateDto' })
export class CreateDto implements ICreateDto {


  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly type: string;
  
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;



}