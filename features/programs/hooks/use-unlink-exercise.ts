import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { unlinkExercise } from '../api/unlink-exercise'

interface UnlinkExerciseVariables {
  programId: string
  supersetId: string
  exerciseId: string
}

export function useUnlinkExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, supersetId, exerciseId }: UnlinkExerciseVariables) =>
      unlinkExercise(programId, supersetId, exerciseId),
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
