import { ITemplate } from '@/types/models'
import { ITemplateDto } from '../types/templates.dto'
import { mapTemplateWorkoutItemDtoToModel } from './templateWorkoutItem.mapper'

export function mapTemplateDtoToModel(dto: ITemplateDto): ITemplate {
  return {
    _id: dto._id,
    name: dto.name,
    description: dto.description,
    templateWorkout: dto.templateWorkout.map(mapTemplateWorkoutItemDtoToModel),
  }
}
