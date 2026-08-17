import { api } from '@/services/api'

export async function deletePeriodization(periodizationId: string): Promise<void> {
  await api.delete(`/api/periodizations/${periodizationId}`)
}
