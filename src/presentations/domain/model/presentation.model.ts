import { AutoMap } from '@automapper/classes';

export class PresentationModel {

  @AutoMap()
  public presentation_id: string;

  @AutoMap()
  public user_id: string;

  @AutoMap()
  readonly of_full_name: string;

  @AutoMap()
  readonly of_title: string;

  @AutoMap()
  readonly of_address: string;

  @AutoMap()
  readonly of_country: string;

  @AutoMap()
  readonly of_city: string;

  @AutoMap()
  readonly of_phone: string;

  @AutoMap()
  readonly of_email: string;

  @AutoMap()
  readonly to_full_name: string;

  @AutoMap()
  readonly to_email: string;

  @AutoMap()
  readonly to_company: string;

  @AutoMap()
  readonly to_address: string;

  @AutoMap()
  readonly to_city: string;

  @AutoMap()
  readonly to_country: string;

  @AutoMap()
  readonly greeting: string;

  @AutoMap()
  readonly content: string;

  @AutoMap()
  readonly date: Date;

  @AutoMap()
  readonly closing: string;

  @AutoMap()
  readonly signature: string;
}
