import { api } from '@/services/api'
import { ISetSupersetNotePayload } from '../types/superset.dto'

export async function setSupersetNote(
  programId: string,
  supersetId: string,
  payload: ISetSupersetNotePayload,
) {
  await api.patch(`/api/programs/${programId}/supersets/${supersetId}/note`, payload)
}
