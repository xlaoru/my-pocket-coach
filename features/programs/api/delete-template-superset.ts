import { api } from '@/services/api'

export async function deleteTemplateSuperset(
  templateId: string,
  supersetId: string,
): Promise<void> {
  await api.delete(`/api/templates/${templateId}/supersets/${supersetId}`)
}
