import { IWorkoutItem } from '@/types/models'

export interface IProgramDto {
  _id: string
  name: string
  description?: string
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
