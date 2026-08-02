import { api } from '@/services/api'
import { IEditStageDescriptionPayload } from '../types/stage.dto'

export async function editStageDescription(
  periodizationId: string,
  stageId: string,
  payload: IEditStageDescriptionPayload,
): Promise<void> {
  await api.patch(`/api/periodizations/${periodizationId}/stages/${stageId}/description`, payload)
}
