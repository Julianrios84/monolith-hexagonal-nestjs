export interface IModelDto {
  readonly id: string;
  readonly user_id: string;
  readonly of_full_name: string;
  readonly of_title: string;
  readonly of_address: string;
  readonly of_country: string;
  readonly of_city: string;
  readonly of_phone: string;
  readonly of_email: string;
  readonly to_full_name: string;
  readonly to_email: string;
  readonly to_company: string;
  readonly to_address: string;
  readonly to_city: string;
  readonly to_country: string;
  readonly greeting: string;
  readonly content: string;
  readonly date: Date;
  readonly closing: string;
  readonly signature: string;
}