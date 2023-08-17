/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { CreateDto, GetDto, UpdateDto } from '@educations/application/dto';
import { EducationModel } from '@educations/domain/model';

@Injectable()
export class EducationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreateDto, EducationModel);
      createMap(mapper, UpdateDto, EducationModel);
      createMap(
        mapper,
        EducationModel,
        GetDto,
        forMember(
          (dest) => dest.id,
          mapFrom((src) => src.education_id),
        )
      );
    };
  }
}
