import { api } from '@/services/api'

export async function unlinkAllExercises(programId: string, supersetId: string): Promise<void> {
  await api.delete(`/api/programs/${programId}/supersets/${supersetId}/unlink`)
}
