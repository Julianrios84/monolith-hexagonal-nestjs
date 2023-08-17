/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { CreateDto, GetDto, UpdateDto } from '@personals/application/dto';
import { DataPersonalModel } from '@personals/domain/model';

@Injectable()
export class InfoPersonalProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreateDto, DataPersonalModel);
      createMap(mapper, UpdateDto, DataPersonalModel);
      createMap(
        mapper,
        DataPersonalModel,
        GetDto,
        forMember(
          (dest) => dest.id,
          mapFrom((src) => src.personal_id),
        ),
    
      );
    };
  }
}
