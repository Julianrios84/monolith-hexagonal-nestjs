import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { IPayloadDto } from "@auth/domain/dto";

export class PayloadDto implements IPayloadDto {

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;
 
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

}