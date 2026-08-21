import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteExerciseSet } from '../api/delete-exercise-set'

interface DeleteExerciseSetVariables {
  programId: string
  exerciseId: string
  setIndex: number
}

export function useDeleteExerciseSet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, exerciseId, setIndex }: DeleteExerciseSetVariables) =>
      deleteExerciseSet(programId, exerciseId, setIndex),
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.programs.byId(variables.programId),
      })
    },
  })
}
