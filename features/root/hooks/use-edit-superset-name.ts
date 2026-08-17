import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editSupersetName } from '../api/edit-superset-name'
import { IEditSupersetNamePayload } from '../types/superset.dto'

interface EditSupersetNameVaribales {
  programId: string
  supersetId: string
  payload: IEditSupersetNamePayload
}

export function useEditSupersetName() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, supersetId, payload }: EditSupersetNameVaribales) =>
      editSupersetName(programId, supersetId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.programs.byId(variables.programId),
      })
    },
  })
}
