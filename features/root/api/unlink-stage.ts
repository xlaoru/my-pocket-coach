import { api } from '@/services/api'

export async function unlinkStage(
  programId: string,
  periodizationId: string,
  stageId: string,
): Promise<void> {
  await api.patch(
    `/api/programs/${programId}/periodizations/${periodizationId}/stages/${stageId}/unlink`,
  )
}
