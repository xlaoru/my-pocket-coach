import { api } from '@/services/api'

export async function linkTemplateExercise(
  templateId: string,
  supersetId: string,
  exerciseId: string,
): Promise<void> {
  await api.post(
    `/api/templates/${templateId}/supersets/${supersetId}/exercises/${exerciseId}/link`,
  )
}
