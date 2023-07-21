import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { ApiSchema } from "src/common/application/decorators";
import { IGetUserDto } from "src/users/domain/dto";


@ApiSchema({ name: 'UserGetDto' })
export class GetDto implements IGetUserDto {
  
  @AutoMap()
  @ApiProperty()
  @IsString()
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
