/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { CreateDto, GetDto, UpdateDto } from '@curriculums/application/dto';
import { CurriculumModel } from '@curriculums/domain/model';

@Injectable()
export class CurriculumProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreateDto, CurriculumModel);
      createMap(mapper, UpdateDto, CurriculumModel);
      createMap(
        mapper,
        CurriculumModel,
        GetDto,
        forMember(
          (dest) => dest.id,
          mapFrom((src) => src.curriculum_id),
        ),
        forMember(
          (dest) => dest.user_id,
          mapFrom((src) => src.user_id)
        ),
        forMember(
          (dest) => dest.datapersonal,
          mapFrom((src) => src.datapersonal),
        ),
        forMember(
          (dest) => dest.educations,
          mapFrom((src) => src.educations),
        ),
        forMember(
          (dest) => dest.workexperies,
          mapFrom((src) => src.workexperies),
        ),
        forMember(
          (dest) => dest.skills,
          mapFrom((src) => src.skills),
        ),
        forMember(
          (dest) => dest.certifications,
          mapFrom((src) => src.certifications),
        ),
        forMember(
          (dest) => dest.courses,
          mapFrom((src) => src.courses),
        ),
        forMember(
          (dest) => dest.projects,
          mapFrom((src) => src.projects),
        ),
        forMember(
          (dest) => dest.presentation,
          mapFrom((src) => src.presentation),
        ),
      );
    };
  }
}
