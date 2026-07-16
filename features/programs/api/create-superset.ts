import { api } from '@/services/api'
import { mapSupersetDtoToModel } from '../mappers/superset.mapper'
import { ICreateSupersetPayload, ISupersetDTO } from '../types/superset.dto'

export async function createSuperset(programId: string, payload: ICreateSupersetPayload) {
  const { data } = await api.post<ISupersetDTO>(`/api/programs/${programId}/supersets`, payload)
  return mapSupersetDtoToModel(data)
}
