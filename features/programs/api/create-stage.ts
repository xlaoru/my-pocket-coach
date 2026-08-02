import { api } from '@/services/api'
import { ICreateStagePayload } from '../types/stage.dto'

export async function createStage(
  periodizationId: string,
  payload: ICreateStagePayload,
): Promise<void> {
  await api.post(`/api/periodizations/${periodizationId}/stages`, payload)
}
