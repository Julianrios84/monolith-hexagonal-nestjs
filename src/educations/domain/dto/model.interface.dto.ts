export interface IModelDto {
  readonly id: string;
  readonly user_id: string;
  readonly institution: string
  readonly degree: string
  readonly field_of_study: string
  readonly start_date: Date
  readonly finish_date: Date
}