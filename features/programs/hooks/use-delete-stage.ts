import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteStage } from '../api/delete-stage'

interface DeleteStageVaribles {
  periodizationId: string
  stageId: string
}

export function useDeleteStage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ periodizationId, stageId }: DeleteStageVaribles) =>
      deleteStage(periodizationId, stageId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.periodizations.byId(variables.periodizationId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.periodizations.all,
      })
    },
  })
}
