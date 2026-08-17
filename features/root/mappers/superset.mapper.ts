import { ISuperset } from '@/types/models'
import { ISupersetDTO } from '../types/superset.dto'
import { mapExerciseDtoToModel } from './exercise.mapper'

export function mapSupersetDtoToModel(dto: ISupersetDTO): ISuperset {
  return {
    _id: dto._id,
    name: dto.name,
    type: dto.type,
    components: dto.components.map(mapExerciseDtoToModel),
  }
}
