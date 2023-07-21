import { AutoMap } from '@automapper/classes';

export class CourseModel {

  @AutoMap()
  readonly _id: string;

  @AutoMap()
  readonly user_id: string;

  @AutoMap()
  readonly title: string
  
  @AutoMap()
  readonly supplier: string

  @AutoMap()
  readonly description: string

  @AutoMap()
  readonly duration: string

  @AutoMap()
  readonly url: string

  @AutoMap()
  readonly qualification: number

  @AutoMap()
  readonly tags: string[]

}
