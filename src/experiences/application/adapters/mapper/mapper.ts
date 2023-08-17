/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { CreateDto, GetDto, UpdateDto } from '@experiences/application/dto';
import { ExperienceModel } from '@experiences/domain/model';

@Injectable()
export class ExperienceProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreateDto, ExperienceModel);
      createMap(mapper, UpdateDto, ExperienceModel);
      createMap(
        mapper,
        ExperienceModel,
        GetDto,
        forMember(
          (dest) => dest.id,
          mapFrom((src) => src.experience_id),
        )
      );
    };
  }
}
