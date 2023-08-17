/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
} from '@automapper/core';
import { CreateDto, GetDto, UpdateDto } from '@skills/application/dto';
import { SkillModel } from '@skills/domain/model';

@Injectable()
export class SkillProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreateDto, SkillModel);
      createMap(mapper, UpdateDto, SkillModel);
      createMap(
        mapper,
        SkillModel,
        GetDto,
        forMember(
          (dest) => dest.id,
          mapFrom((src) => src.skill_id)
        )
      );
    };
  }
}
