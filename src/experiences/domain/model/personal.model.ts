import { AutoMap } from '@automapper/classes';

export class ExperienceModel {

  @AutoMap()
  public experience_id: string;

  @AutoMap()
  public user_id: string;

  @AutoMap()
  public title: string
  
  @AutoMap()
  public company: string
  
  @AutoMap()
  public description: string
  
  @AutoMap()
  public start_date: Date
  
  @AutoMap()
  public finish_date: Date


}
