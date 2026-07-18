import { api } from '@/services/api'
import { ISuperset } from '@/types/models'
import { mapSupersetDtoToModel } from '../mappers/superset.mapper'
import { IEditSupersetNamePayload, ISupersetDTO } from '../types/superset.dto'

export async function editSupersetName(
  programId: string,
  supersetId: string,
  payload: IEditSupersetNamePayload,
): Promise<ISuperset> {
  const { data } = await api.patch<ISupersetDTO>(
    `/api/programs/${programId}/supersets/${supersetId}`,
    payload,
  )

  return mapSupersetDtoToModel(data)
}
