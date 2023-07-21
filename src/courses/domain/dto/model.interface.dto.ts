export interface IModelDto {
  readonly id: string;
  readonly user_id: string;
  readonly title: string
  readonly supplier: string
  readonly description: string
  readonly duration: string
  readonly url: string
  readonly qualification: number
  readonly tags: string[]
}