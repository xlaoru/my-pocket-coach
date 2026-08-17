import { api } from '@/services/api'
import { IEditTemplateDescriptionPayload } from '../types/templates.dto'

export async function editTemplateDescription(
  templateId: string,
  payload: IEditTemplateDescriptionPayload,
) {
  await api.patch(`/api/templates/${templateId}/description`, payload)
}
