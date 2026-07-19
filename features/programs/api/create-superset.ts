import { api } from '@/services/api'
import { ICreateSupersetPayload } from '../types/superset.dto'

export async function createSuperset(programId: string, payload: ICreateSupersetPayload): Promise<void> {
  await api.post(`/api/programs/${programId}/supersets`, payload)
}
