import { api } from '@/services/api'
import { ICreateTemplateExercisePayload } from '../types/templateExercise.dto'

export async function createTemplateExercise(
  templateId: string,
  payload: ICreateTemplateExercisePayload,
): Promise<void> {
  await api.post(`/api/templates/${templateId}/exercises`, payload)
}
