import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteSuperset } from '../api/delete-superset'

interface DeleteSupersetVariables {
  programId: string
  supersetId: string
}

export function useDeleteSuperset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, supersetId }: DeleteSupersetVariables) =>
      deleteSuperset(programId, supersetId),
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
