import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addExerciseSet } from '../api/add-exercise-set'
import { IAddExerciseSetPayload } from '../types/exercise.dto'

interface AddExerciseSetVariables {
  programId: string
  exerciseId: string
  payload: IAddExerciseSetPayload
}

export function useAddExerciseSet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, exerciseId, payload }: AddExerciseSetVariables) =>
      addExerciseSet(programId, exerciseId, payload),
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.programs.byId(variables.programId),
      })
    },
  })
}
