import { ITemplateWorkoutItemDto } from './templateWorkoutItem.dto'

export interface ITemplateDto {
  _id: string
  name: string
  description?: string
  templateWorkout: ITemplateWorkoutItemDto[]
}

export interface ICreateTemplatePayload {
  name: string
  description?: string
}

export interface IEditTemplateNamePayload {
  name: string
}

export interface IEditTemplateDescriptionPayload {
  description: string
}
