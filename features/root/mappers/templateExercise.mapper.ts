import { ITemplateExercise } from '@/types/models'
import { ITemplateExerciseDto } from '../types/templateExercise.dto'

export function mapTemplateExerciseDtoToModel(dto: ITemplateExerciseDto): ITemplateExercise {
  return {
    _id: dto._id,
    name: dto.name,
    sets: dto.sets,
  }
}
