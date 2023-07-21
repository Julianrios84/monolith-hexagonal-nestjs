import { AutoMap } from '@automapper/classes';

export class CurriculumModel {

  @AutoMap()
  readonly _id: string;

  @AutoMap()
  readonly user_id: string;

  @AutoMap()
  readonly title: string

  @AutoMap()
  readonly  datapersonal: string
  
  @AutoMap()
  readonly  educations: string[]

  @AutoMap()
  readonly  workexperies: string[]

  @AutoMap()
  readonly  skills: string[]
  
  @AutoMap()
  readonly  certifications: string[]

  @AutoMap()
  readonly  courses: string[]

  @AutoMap()
  readonly  projects: string[]
    
  @AutoMap()
  readonly  presentation: string

  @AutoMap()
  readonly status: boolean

}
