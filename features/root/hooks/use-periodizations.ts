import { queryKeys } from '@/lib/query/query-keys'
import { useQuery } from '@tanstack/react-query'
import { getPeriodizations } from '../api/get-periodizations'

export function usePeriodizations() {
  return useQuery({
    queryKey: queryKeys.periodizations.all,
    queryFn: getPeriodizations,
  })
}
