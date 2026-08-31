import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editExerciseSet } from '../api/edit-exercise-set'
import { IEditExerciseSetPayload } from '../types/exercise.dto'

interface EditExerciseSetVariables {
  programId: string
  exerciseId: string
  setIndex: number
  payload: IEditExerciseSetPayload
}

export function useEditExerciseSet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, exerciseId, setIndex, payload }: EditExerciseSetVariables) =>
      editExerciseSet(programId, exerciseId, setIndex, payload),
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.programs.byId(variables.programId),
      })
    },
  })
}
