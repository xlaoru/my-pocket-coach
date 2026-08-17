import { ITemplateExerciseDto } from './templateExercise.dto'

export interface ITemplateWorkoutItemDto {
  _id: string
  type: 'exercise' | 'superset'
  name: string
  components: ITemplateExerciseDto[]
}
