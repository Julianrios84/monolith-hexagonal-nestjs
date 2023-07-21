import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ITokenDto } from "src/auth/domain/dto";

export class TokenDto implements ITokenDto {

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;

}