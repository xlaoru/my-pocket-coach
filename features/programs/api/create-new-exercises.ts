import { api } from '@/services/api'
import { ICreateNewExercisePayload } from '../types/superset.dto'

export async function createNewExercise(
  programId: string,
  supersetId: string,
  payload: ICreateNewExercisePayload,
): Promise<void> {
  await api.post(`/api/programs/${programId}/supersets/${supersetId}`, payload)
}
