import { api } from '@/services/api'
import { IEditPeriodizationDescriptionPayload } from '../types/periodization.dto'

export async function editPeriodizationDescription(
  periodizationId: string,
  payload: IEditPeriodizationDescriptionPayload,
): Promise<void> {
  await api.patch(`/api/periodizations/${periodizationId}/description`, payload)
}
