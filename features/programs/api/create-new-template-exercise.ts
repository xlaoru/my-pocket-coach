import { api } from '@/services/api'
import { ICreateNewTemplateExercisePayload } from '../types/templateSuperset.dto'

export async function createNewTemplateExercise(
  templateId: string,
  supersetId: string,
  payload: ICreateNewTemplateExercisePayload,
): Promise<void> {
  await api.post(`/api/templates/${templateId}/supersets/${supersetId}`, payload)
}
