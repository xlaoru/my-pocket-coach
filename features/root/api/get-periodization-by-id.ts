import { api } from '@/services/api'
import { IPeriodization } from '@/types/models'
import { mapPeriodizationDtoModel } from '../mappers/periodization.mapper'
import { IPeriodizationDto } from '../types/periodization.dto'

export async function getPeriodizationById(id: string): Promise<IPeriodization> {
  const { data } = await api.get<IPeriodizationDto>(`/api/periodizations/${id}`)
  return mapPeriodizationDtoModel(data)
}
