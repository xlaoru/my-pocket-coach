import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSuperset } from '../api/create-superset'
import { ICreateSupersetPayload } from '../types/superset.dto'

interface CreateSupersetVariables {
  programId: string
  payload: ICreateSupersetPayload
}

export function useCreateSuperset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, payload }: CreateSupersetVariables) =>
      createSuperset(programId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.programs.byId(variables.programId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.programs.all,
      })
    },
  })
}
