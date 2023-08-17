import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ITokenDto } from "@auth/domain/dto";

export class TokenDto implements ITokenDto {

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly token: string;

}