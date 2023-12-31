import { Mapper, createMap } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { SignInDto, SignUpDto } from "@auth/application/dto";
import { UserModel } from "@auth/domain/model";

@Injectable()
export class AuthProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, SignInDto, UserModel);
      createMap(mapper, SignUpDto, UserModel);
    };
  }
}
