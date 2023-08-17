/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { CreateDto, GetDto, UpdateDto } from '@users/application/dto';
import { UserModel } from '@users/domain/model';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreateDto, UserModel);
      createMap(mapper, UpdateDto, UserModel);
      createMap(
        mapper,
        UserModel,
        GetDto,
        forMember(
          (dest) => dest.id,
          mapFrom((src) => src.user_id)
        )
        // forMember((dest) => dest.id, ignore()),
      );
    };
  }
}
