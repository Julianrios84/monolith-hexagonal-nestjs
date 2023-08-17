/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { CreateDto, GetDto, UpdateDto } from '@courses/application/dto';
import { CourseModel } from '@courses/domain/model';

@Injectable()
export class CourseProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreateDto, CourseModel);
      createMap(mapper, UpdateDto, CourseModel);
      createMap(
        mapper,
        CourseModel,
        GetDto,
        forMember(
          (dest) => dest.id,
          mapFrom((src) => src.course_id),
        ),
        forMember(
          (dest) => dest.tags,
          mapFrom((src) => src.tags),
        ),
      );
    };
  }
}
