import { AutoMap } from '@automapper/classes';

export class EducationModel {

  @AutoMap()
  readonly education_id: string;

  @AutoMap()
  readonly user_id: string;

  @AutoMap()
  readonly institution: string

  @AutoMap()
  readonly degree: string
  
  @AutoMap()
  readonly field_of_study: string
  
  @AutoMap()
  readonly start_date: Date
  
  @AutoMap()
  readonly finish_date: Date


}
