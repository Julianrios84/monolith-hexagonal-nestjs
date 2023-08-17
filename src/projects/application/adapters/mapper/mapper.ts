/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, mapFrom, Mapper } from '@automapper/core';
import { CreateDto, GetDto, UpdateDto } from '@projects/application/dto';
import { ProjectModel } from '@projects/domain/model';

@Injectable()
export class ProjectProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreateDto, ProjectModel);
      createMap(mapper, UpdateDto, ProjectModel);
      createMap(
        mapper,
        ProjectModel,
        GetDto,
        forMember(
          (dest) => dest.id,
          mapFrom((src) => src.project_id)
        ),
      );
    };
  }
}
