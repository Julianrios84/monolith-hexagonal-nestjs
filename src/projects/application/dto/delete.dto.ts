import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiSchema } from "@common/application/decorators";
import { IDeleteDto } from "@projects/domain/dto";


@ApiSchema({ name: 'ProjectDeleteDto' })
export class DeleteDto implements IDeleteDto {
  
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