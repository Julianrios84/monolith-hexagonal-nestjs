import { AutoMap } from '@automapper/classes';

export class CertificationModel {

  @AutoMap()
  public _id: string;

  @AutoMap()
  public user_id: string;

  @AutoMap()
  public title: string
  
  @AutoMap()
  public institution: string
  
  @AutoMap()
  public start_date: Date
  
  @AutoMap()
  public finish_date: Date


}
