import { ITemplateWorkoutItem } from '@/types/models'
import { ITemplateWorkoutItemDto } from '../types/templateWorkoutItem.dto'
import { mapTemplateExerciseDtoToModel } from './templateExercise.mapper'

export function mapTemplateWorkoutItemDtoToModel(
  dto: ITemplateWorkoutItemDto,
): ITemplateWorkoutItem {
  return {
    _id: dto._id,
    type: dto.type,
    name: dto.name,
    components: dto.components.map(mapTemplateExerciseDtoToModel),
  }
}
