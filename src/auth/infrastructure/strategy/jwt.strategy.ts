import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AuthService } from "@auth/application/services";
import { PayloadDto } from "@auth/root/application/dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload: PayloadDto): Promise<PayloadDto> {
    const user = await this.authService.validate(payload)
    if(!user) throw new UnauthorizedException()
    return user
  }
}