import { IPeriodization } from '@/types/models'
import { IPeriodizationDto } from '../types/periodization.dto'

export function mapPeriodizationDtoModel(dto: IPeriodizationDto): IPeriodization {
  return {
    _id: dto._id,
    name: dto.name,
    description: dto.description,
    stages: dto.stages,
  }
}
