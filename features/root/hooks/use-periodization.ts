import { queryKeys } from '@/lib/query/query-keys'
import { useQuery } from '@tanstack/react-query'
import { getPeriodizationById } from '../api/get-periodization-by-id'

export function usePeriodization(periodizationId: string) {
  return useQuery({
    queryKey: queryKeys.periodizations.byId(periodizationId),
    queryFn: () => getPeriodizationById(periodizationId),
    enabled: Boolean(periodizationId),
  })
}
