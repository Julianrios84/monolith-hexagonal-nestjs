import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiSchema } from "src/common/application/decorators";
import { IDeleteUserDto } from "src/users/domain/dto";

@ApiSchema({ name: 'UserDeleteDto' })
export class DeleteDto implements IDeleteUserDto {

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly status: number;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()  
  @IsString()
  readonly message: string;
}