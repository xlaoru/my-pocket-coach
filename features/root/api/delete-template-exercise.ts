import { api } from '@/services/api'

export async function deleteTemplateExercise(
  templateId: string,
  exerciseId: string,
): Promise<void> {
  await api.delete(`/api/templates/${templateId}/exercises/${exerciseId}`)
}
