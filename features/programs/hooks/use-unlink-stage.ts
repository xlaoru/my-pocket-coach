import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { unlinkStage } from '../api/unlink-stage'

interface UnlinkStageVariables {
  programId: string
  periodizationId: string
  stageId: string
}

export function useUnlinkStage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, periodizationId, stageId }: UnlinkStageVariables) =>
      unlinkStage(programId, periodizationId, stageId),
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.programs.byId(variables.programId),
      })
    },
  })
}
