import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePeriodization } from '../api/delete-periodization'

interface DeletePeriodizationVariables {
  periodizationId: string
}

export function useDeletePeriodization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ periodizationId }: DeletePeriodizationVariables) =>
      deletePeriodization(periodizationId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.periodizations.byId(variables.periodizationId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.periodizations.all,
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.programs.all,
      })
    },
  })
}
