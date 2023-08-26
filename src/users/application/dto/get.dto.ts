import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsUUID } from "class-validator";
import { ApiSchema } from "@common/application/decorators";
import { IGetDto } from "@users/domain/dto";

@ApiSchema({ name: 'UserGetDto' })
export class GetDto implements IGetDto {
  
  @AutoMap()
  @ApiProperty()
  @IsUUID()
  readonly id: string;

  @AutoMap()
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  readonly username: string;

  
}
