import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiSchema } from "@common/application/decorators";
import { IDeleteDto } from "@experiences/domain/dto";

@ApiSchema({ name: 'ExperienceDeleteDto' })
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