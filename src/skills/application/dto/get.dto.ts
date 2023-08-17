import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { ApiSchema } from "@common/application/decorators";
import { IGetDto } from "@skills/domain/dto";


@ApiSchema({ name: 'SkillGetDto' })
export class GetDto implements IGetDto {

  @AutoMap()
  @ApiProperty()
  @IsUUID()
  readonly id: string;
  
  @AutoMap()
  @ApiProperty()
  @IsUUID()
  readonly user_id: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  readonly type: string;
  
  @AutoMap()
  @ApiProperty()
  @IsString()
  readonly name: string;
}