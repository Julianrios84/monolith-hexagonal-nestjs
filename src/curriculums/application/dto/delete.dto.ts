import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiSchema } from "src/common/application/decorators";
import { IDeleteDto } from "src/curriculums/domain/dto";

@ApiSchema({ name: 'CurriculumDeleteDto' })
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