import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ISignUpDto } from "@auth/domain/dto";

export class SignUpDto implements ISignUpDto {
    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly username: string;
    
    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}