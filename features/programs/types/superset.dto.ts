import { ISet } from '@/types/models'
import { IExerciseDto } from './exercise.dto'

export interface ISupersetDTO {
  _id: string
  name: string
  type: 'superset'
  components: IExerciseDto[]
  note: string
}

export interface ICreateSupersetPayload {
  name?: string
  workoutItemIds: string[]
}

export interface IEditSupersetNamePayload {
  name: string
}

export interface ICreateNewExercisePayload {
  name: string
  sets: ISet[]
}

export interface ISetSupersetNotePayload {
  note: string
}
