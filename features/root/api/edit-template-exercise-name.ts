import { api } from '@/services/api'
import { IEditTemplateExerciseNamePayload } from '../types/templateExercise.dto'

export async function editTemplateExerciseName(
  templateId: string,
  exerciseId: string,
  payload: IEditTemplateExerciseNamePayload,
): Promise<void> {
  await api.patch(`/api/templates/${templateId}/exercises/${exerciseId}/name`, payload)
}
