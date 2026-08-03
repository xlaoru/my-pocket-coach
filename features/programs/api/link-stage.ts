import { api } from '@/services/api'

export async function linkStage(programId: string, periodizationId: string, stageId: string) {
  await api.patch(
    `/api/programs/${programId}/periodizations/${periodizationId}/stages/${stageId}/link`,
  )
}
