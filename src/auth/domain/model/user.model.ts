import { AutoMap } from "@automapper/classes";

export class UserModel {
  @AutoMap()
  readonly user_id: string;
  
  @AutoMap()
  readonly username: string;
  
  @AutoMap()
  readonly email: string
  
  @AutoMap()
  readonly password: string
}
