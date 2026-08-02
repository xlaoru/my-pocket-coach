export interface IStageDto {
  _id: string
  name: string
  description: string
}

export interface ICreateStagePayload {
  name: string
  description?: string
}
