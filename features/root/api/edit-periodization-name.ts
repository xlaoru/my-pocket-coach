import { api } from '@/services/api'
import { IEditPeriodizationNamePayload } from '../types/periodization.dto'

export async function editPeriodizationName(
  periodizationId: string,
  payload: IEditPeriodizationNamePayload,
): Promise<void> {
  await api.patch(`/api/periodizations/${periodizationId}/name`, payload)
}
