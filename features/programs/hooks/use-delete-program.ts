import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProgram } from '../api/delete-program'

interface DeleteProgramVariables {
  programId: string
}

export function useDeleteProgram() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId }: DeleteProgramVariables) => deleteProgram(programId),
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
