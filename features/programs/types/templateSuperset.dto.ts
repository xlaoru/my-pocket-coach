import { ITemplateExerciseDto } from './templateExercise.dto'

export interface ITemplateSupersetDTO {
  _id: string
  name: string
  type: 'superset'
  components: ITemplateExerciseDto[]
}

export interface ICreateTemplateSupersetPayload {
  name?: string
  templateWorkoutItemIds: string[]
}

export interface IEditTemplateSupersetNamePayload {
  name: string
}

export interface ICreateTemplateExerciseInSupersetPayload {
  name: string
  sets: number
}
