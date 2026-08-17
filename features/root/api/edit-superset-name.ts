import { api } from '@/services/api'
import { IEditSupersetNamePayload } from '../types/superset.dto'

export async function editSupersetName(
  programId: string,
  supersetId: string,
  payload: IEditSupersetNamePayload,
): Promise<void> {
  await api.patch(`/api/programs/${programId}/supersets/${supersetId}`, payload)
}
