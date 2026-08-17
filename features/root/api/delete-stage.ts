import { api } from '@/services/api'

export async function deleteStage(periodizationId: string, stageId: string): Promise<void> {
  await api.delete(`/api/periodizations/${periodizationId}/stages/${stageId}`)
}
