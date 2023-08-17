import { AutoMap } from '@automapper/classes';

export class DataPersonalModel {

  @AutoMap()
  public personal_id: string;

  @AutoMap()
  public user_id: string;

  @AutoMap()
  public first_name: string;

  @AutoMap()
  public last_name: string;

  @AutoMap()
  public email: string;

  @AutoMap()
  public phone: string;

  @AutoMap()
  public address: string;

  @AutoMap()
  public city: string;

  @AutoMap()
  public country: string;

  @AutoMap()
  public resume: string;


}
