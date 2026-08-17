import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editStageName } from '../api/edit-stage-name'
import { IEditStageNamePayload } from '../types/stage.dto'

interface EditStageNameVariables {
  periodizationId: string
  stageId: string
  payload: IEditStageNamePayload
}

export function useEditStageName() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ periodizationId, stageId, payload }: EditStageNameVariables) =>
      editStageName(periodizationId, stageId, payload),
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
