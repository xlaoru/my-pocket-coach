import { api } from '@/services/api'

export async function generateProgramByTemplate(templateId: string): Promise<void> {
  await api.post(`/api/templates/${templateId}/generate`)
}
