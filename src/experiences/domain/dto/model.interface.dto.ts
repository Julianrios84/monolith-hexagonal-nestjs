export interface IModelDto {
  readonly id: string;
  readonly user_id: string;
  readonly title: string
  readonly company: string
  readonly description: string
  readonly start_date: Date
  readonly finish_date: Date
}