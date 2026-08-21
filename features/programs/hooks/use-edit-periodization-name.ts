import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editPeriodizationName } from '../api/edit-periodization-name'
import { IEditPeriodizationNamePayload } from '../types/periodization.dto'

interface EditPeriodizationNameVariables {
  periodizationId: string
  payload: IEditPeriodizationNamePayload
}

export function useEditPeriodizationName() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ periodizationId, payload }: EditPeriodizationNameVariables) =>
      editPeriodizationName(periodizationId, payload),
    onSuccess: (_, variables) => {
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.periodizations.byId(variables.periodizationId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.periodizations.all,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.programs.all,
        }),
      ])
    },
  })
}
