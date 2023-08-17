import { AutoMap } from '@automapper/classes';

export class ProjectModel {

  @AutoMap()
  public project_id: string;

  @AutoMap()
  public user_id: string;

  @AutoMap()
  public name: string
  
  @AutoMap()
  public description: string
  
  @AutoMap()
  public start_date: Date
  
  @AutoMap()
  public finish_date: Date

  @AutoMap()
  public role: string


}
