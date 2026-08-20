import { api } from '@/services/api'
import { ISetExerciseNotePayload } from '../types/exercise.dto'

export async function setExerciseNote(
  programId: string,
  exerciseId: string,
  payload: ISetExerciseNotePayload,
) {
  await api.patch(`/api/programs/${programId}/exercises/${exerciseId}/note`, payload)
}
