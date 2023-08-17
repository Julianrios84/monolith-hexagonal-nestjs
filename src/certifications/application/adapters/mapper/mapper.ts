/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { CreateDto, GetDto, UpdateDto } from '@certifications/application/dto';
import { CertificationModel } from '@certifications/domain/model';

@Injectable()
export class CertificationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreateDto, CertificationModel);
      createMap(mapper, UpdateDto, CertificationModel);
      createMap(
        mapper,
        CertificationModel,
        GetDto,
        forMember(
          (dest) => dest.id,
          mapFrom((src) => src.certification_id),
        )
      );
    };
  }
}
