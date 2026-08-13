import { ITemplateSuperset } from '@/types/models'
import { ITemplateSupersetDTO } from '../types/templateSuperset.dto'
import { mapTemplateExerciseDtoToModel } from './templateExercise.mapper'

export function mapTemplateSupersetDtoToModel(dto: ITemplateSupersetDTO): ITemplateSuperset {
  return {
    _id: dto._id,
    name: dto.name,
    type: dto.type,
    components: dto.components.map(mapTemplateExerciseDtoToModel),
  }
}
