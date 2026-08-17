import { api } from '@/services/api'
import { IEditTemplateSupersetNamePayload } from '../types/templateSuperset.dto'

export async function editTemplateSupersetName(
  templateId: string,
  supersetId: string,
  payload: IEditTemplateSupersetNamePayload,
): Promise<void> {
  await api.patch(`/api/templates/${templateId}/supersets/${supersetId}`, payload)
}
