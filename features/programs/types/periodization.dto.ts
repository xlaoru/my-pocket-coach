import { IStage } from '@/types/models'

export interface IPeriodizationDto {
  _id: string
  name: string
  description?: string
  stages: IStage[]
}

export interface ICreatePeriodizationPayload {
  name: string
  description?: string
}

export interface IEditPeriodizationNamePayload {
  name: string
}

export interface IEditPeriodizationDescriptionPayload {
  description: string
}
