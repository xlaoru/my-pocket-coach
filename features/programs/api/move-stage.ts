import { api } from '@/services/api'
import { IMoveStagePayload } from '../types/stage.dto'

export async function moveStage(
  periodizationId: string,
  payload: IMoveStagePayload,
): Promise<void> {
  await api.patch(`/api/periodizations/${periodizationId}/stages/move`, payload)
}
