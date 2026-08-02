import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editPeriodizationDescription } from '../api/edit-periodization-description'
import { IEditPeriodizationDescriptionPayload } from '../types/periodization.dto'

interface EditPeriodizationDescriptionVariables {
  periodizationId: string
  payload: IEditPeriodizationDescriptionPayload
}

export function useEditPeriodizationDescription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ periodizationId, payload }: EditPeriodizationDescriptionVariables) =>
      editPeriodizationDescription(periodizationId, payload),
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
