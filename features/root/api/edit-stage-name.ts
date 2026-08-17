import { api } from '@/services/api'
import { IEditStageNamePayload } from '../types/stage.dto'

export async function editStageName(
  periodizationId: string,
  stageId: string,
  payload: IEditStageNamePayload,
): Promise<void> {
  await api.patch(`/api/periodizations/${periodizationId}/stages/${stageId}/name`, payload)
}
