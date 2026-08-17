import { api } from '@/services/api'

export async function unlinkTemplateExercise(
  templateId: string,
  supersetId: string,
  exerciseId: string,
): Promise<void> {
  await api.delete(
    `/api/templates/${templateId}/supersets/${supersetId}/exercises/${exerciseId}/unlink`,
  )
}
