import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { unlinkAllExercises } from '../api/unlink-all-exercises'

interface UnlinkAllExercisesVariables {
  programId: string
  supersetId: string
}

export function useUnlinkAllExercises() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, supersetId }: UnlinkAllExercisesVariables) =>
      unlinkAllExercises(programId, supersetId),
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
