import { AutoMap } from "@automapper/classes";

export class UserModel {
  
  @AutoMap()
  public user_id: string;
  
  @AutoMap()
  public username: string;
  
  @AutoMap()
  public email: string
  
  @AutoMap()
  public password: string
}
