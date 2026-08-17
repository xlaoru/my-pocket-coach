import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { linkExercise } from '../api/link-exercise'

interface LinkExerciseVariables {
  programId: string
  supersetId: string
  exerciseId: string
}

export function useLinkExercises() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, supersetId, exerciseId }: LinkExerciseVariables) =>
      linkExercise(programId, supersetId, exerciseId),
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
