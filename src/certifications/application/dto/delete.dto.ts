import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IDeleteDto } from "@certifications/domain/dto";
import { ApiSchema } from "@common/application/decorators";


@ApiSchema({ name: 'CertificationDeleteDto' })
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