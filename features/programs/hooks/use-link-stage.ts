import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { linkStage } from '../api/link-stage'

interface LinkStageVariables {
  programId: string
  periodizationId: string
  stageId: string
}

export function useLinkStage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, periodizationId, stageId }: LinkStageVariables) =>
      linkStage(programId, periodizationId, stageId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.programs.byId(variables.programId),
      })
    },
  })
}
