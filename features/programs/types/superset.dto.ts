import { IExerciseDto } from './exercise.dto'

export interface ISupersetDTO {
  _id: string
  name: string
  type: 'superset'
  components: IExerciseDto[]
}

export interface ICreateSupersetPayload {
  name?: string
  workoutItemIds: string[]
}
