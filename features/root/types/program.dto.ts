import { IStage, IWorkoutItem } from '@/types/models'

export interface IProgramDto {
  _id: string
  name: string
  description?: string
  periodizationStage: IStage
  workout: IWorkoutItem[]
  date: string
}

export interface ICreateProgramPayload {
  name: string
  description?: string
}

export interface IEditProgramPayload {
  name?: string
  description?: string
}
