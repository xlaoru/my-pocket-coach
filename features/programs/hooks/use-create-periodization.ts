import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPeriodization } from '../api/create-periodization'

export function useCreatePeriodization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPeriodization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.periodizations.all })
    },
  })
}
