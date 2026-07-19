import { api } from '@/services/api'

export async function linkExercise(
  programId: string,
  supersetId: string,
  exerciseId: string,
): Promise<void> {
  await api.post(`/api/programs/${programId}/supersets/${supersetId}/exercises/${exerciseId}/link`)
}
