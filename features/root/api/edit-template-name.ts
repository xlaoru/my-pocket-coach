import { api } from '@/services/api'
import { IEditTemplateNamePayload } from '../types/templates.dto'

export async function editTemplateName(templateId: string, payload: IEditTemplateNamePayload) {
  await api.patch(`/api/templates/${templateId}/name`, payload)
}
