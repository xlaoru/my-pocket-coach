import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createStage } from '../api/create-stage'
import { ICreateStagePayload } from '../types/stage.dto'

interface CreateStageVariables {
  periodizationId: string
  payload: ICreateStagePayload
}

export function useCreateStage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ periodizationId, payload }: CreateStageVariables) =>
      createStage(periodizationId, payload),
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
