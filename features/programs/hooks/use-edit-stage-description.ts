import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editStageDescription } from '../api/edit-stage-description'
import { IEditStageDescriptionPayload } from '../types/stage.dto'

interface EditStageDescriptionVariables {
  periodizationId: string
  stageId: string
  payload: IEditStageDescriptionPayload
}

export function useEditStageDescription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ periodizationId, stageId, payload }: EditStageDescriptionVariables) =>
      editStageDescription(periodizationId, stageId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.periodizations.byId(variables.periodizationId),
      })
    },
  })
}
