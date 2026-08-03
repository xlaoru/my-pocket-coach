import { api } from '@/services/api'
import { ICreatePeriodizationPayload } from '../types/periodization.dto'

export async function createPeriodization(payload: ICreatePeriodizationPayload): Promise<void> {
  await api.post('/api/periodizations', payload)
}
