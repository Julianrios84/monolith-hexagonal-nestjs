import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "../application/services";
import { SignInDto, SignUpDto } from "../application/dto";
import { TokenDto } from "../application/dto/token.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController  {
  
  constructor(private readonly authService: AuthService) {}


  @Post('signin')
  async signin(@Body() body: SignInDto): Promise<TokenDto> {
    return await this.authService.signin(body);
  }

  @Post('signup')
  async signup(@Body() body: SignUpDto): Promise<TokenDto> {
    return await this.authService.signup(body);
  }


  

}