import { api } from '@/services/api'
import { IMoveTemplateExercisePayload } from '../types/templateExercise.dto'

export async function moveTemplateExercise(
  templateId: string,
  payload: IMoveTemplateExercisePayload,
): Promise<void> {
  await api.patch(`/api/templates/${templateId}/templateWorkout/move`, payload)
}
