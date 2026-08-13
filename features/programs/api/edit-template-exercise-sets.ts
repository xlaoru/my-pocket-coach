import { api } from '@/services/api'
import { IEditTemplateExerciseSetsPayload } from '../types/templateExercise.dto'

export async function editTemplateExerciseSets(
  templateId: string,
  exerciseId: string,
  payload: IEditTemplateExerciseSetsPayload,
): Promise<void> {
  await api.patch(`/api/templates/${templateId}/exercises/${exerciseId}/sets`, payload)
}
