import { api } from '@/services/api'
import { ICreateTemplatePayload } from '../types/templates.dto'

export async function createTemplate(payload: ICreateTemplatePayload): Promise<void> {
  await api.post('/api/templates', payload)
}
