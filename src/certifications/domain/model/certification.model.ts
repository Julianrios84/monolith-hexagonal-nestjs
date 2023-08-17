import { AutoMap } from '@automapper/classes';

export class CertificationModel {

  @AutoMap()
  readonly certification_id: string;

  @AutoMap()
  readonly user_id: string;

  @AutoMap()
  readonly title: string
  
  @AutoMap()
  readonly institution: string
  
  @AutoMap()
  readonly start_date: Date
  
  @AutoMap()
  readonly finish_date: Date


}
