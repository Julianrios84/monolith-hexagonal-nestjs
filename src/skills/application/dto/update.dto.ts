import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ApiSchema } from "@common/application/decorators";
import { IUpdateDto } from "@skills/domain/dto";


@ApiSchema({ name: 'SkillUpdateDto' })
export class UpdateDto implements IUpdateDto {

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