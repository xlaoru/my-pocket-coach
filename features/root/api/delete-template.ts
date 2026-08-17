import { api } from '@/services/api'

export async function deleteTemplate(templateId: string): Promise<void> {
  await api.delete(`/api/templates/${templateId}`)
}
