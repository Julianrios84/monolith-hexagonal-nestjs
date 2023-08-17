/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { CreateDto, GetDto, UpdateDto } from '@presentations/application/dto';
import { PresentationModel } from '@presentations/domain/model';

@Injectable()
export class PresentationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreateDto, PresentationModel);
      createMap(mapper, UpdateDto, PresentationModel);
      createMap(
        mapper,
        PresentationModel,
        GetDto,
        forMember(
          (dest) => dest.id,
          mapFrom((src) => src.presentation_id)
        )
      );
    };
  }
}
