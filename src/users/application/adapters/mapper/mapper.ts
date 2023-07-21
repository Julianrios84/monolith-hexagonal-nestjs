/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { CreateDto, GetDto, UpdateDto } from '../../dto';
import { UserModel } from 'src/users/domain/model/user.model';

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
          mapFrom((src) => src._id),
        ),
      );
    };
  }
}
