import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteExercise } from '../api/delete-exercise'

interface DeleteExerciseVariables {
  programId: string
  exerciseId: string
}

export function useDeleteExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, exerciseId }: DeleteExerciseVariables) =>
      deleteExercise(programId, exerciseId),
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
