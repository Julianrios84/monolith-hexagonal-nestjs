import { AutoMap } from "@automapper/classes";

export class SkillModel {

  @AutoMap()
  public _id: string;

  @AutoMap()
  public user_id: string;

  @AutoMap()
  public type: string;

  @AutoMap()
  public name: string;


}