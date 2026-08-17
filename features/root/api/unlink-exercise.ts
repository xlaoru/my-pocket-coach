import { api } from '@/services/api'

export async function unlinkExercise(
  programId: string,
  supersetId: string,
  exerciseId: string,
): Promise<void> {
  await api.delete(`/api/programs/${programId}/supersets/${supersetId}/exercises/${exerciseId}/unlink`)
}
