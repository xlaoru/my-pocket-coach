import { api } from '@/services/api'
import { ICreateTemplateSupersetPayload } from '../types/templateSuperset.dto'

export async function createTemplateSuperset(
  templateId: string,
  payload: ICreateTemplateSupersetPayload,
) {
  await api.post(`/api/templates/${templateId}/supersets`, payload)
}
