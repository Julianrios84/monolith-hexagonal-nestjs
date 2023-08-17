import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from '@auth/domain/adapters';
import { IPayloadDto } from '@auth/domain/dto';

@Injectable()
export class JwtTokenService implements IJwtService {

  constructor(private readonly jwtService: JwtService) {}

   async checkToken(token: string): Promise<boolean> {
    const decode =  await this.jwtService.verifyAsync(token);
    return decode;
  }

   async createToken(payload: IPayloadDto): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

}
