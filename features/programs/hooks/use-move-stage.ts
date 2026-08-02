import { queryKeys } from '@/lib/query/query-keys'
import { IPeriodization } from '@/types/models'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { moveStage } from '../api/move-stage'
import { IMoveStagePayload } from '../types/stage.dto'

interface MoveStageVariables {
  periodizationId: string
  payload: IMoveStagePayload
}

export function useMoveStage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ periodizationId, payload }: MoveStageVariables) =>
      moveStage(periodizationId, payload),
    onMutate: async ({ periodizationId, payload }) => {
      const queryKey = queryKeys.periodizations.byId(periodizationId)

      await queryClient.cancelQueries({ queryKey })

      const previousPeriodization = queryClient.getQueryData<IPeriodization>(queryKey)

      if (previousPeriodization) {
        const stages = [...previousPeriodization.stages]
        const [movedStage] = stages.splice(payload.sourceIndex, 1)
        stages.splice(payload.destinationIndex, 0, movedStage)

        queryClient.setQueryData<IPeriodization>(queryKey, {
          ...previousPeriodization,
          stages,
        })
      }

      return { previousPeriodization }
    },
    onError: (_error, variables, context) => {
      if (context?.previousPeriodization) {
        queryClient.setQueryData(
          queryKeys.periodizations.byId(variables.periodizationId),
          context.previousPeriodization,
        )
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.periodizations.byId(variables.periodizationId),
      })
    },
  })
}
