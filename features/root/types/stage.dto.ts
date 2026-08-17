export interface IStageDto {
  _id: string
  name: string
  description: string
}

export interface ICreateStagePayload {
  name: string
  description?: string
}

export interface IMoveStagePayload {
  sourceIndex: number
  destinationIndex: number
}

export interface IEditStageNamePayload {
  name: string
}

export interface IEditStageDescriptionPayload {
  description: string
}
