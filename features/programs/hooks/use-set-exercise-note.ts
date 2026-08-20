import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setExerciseNote } from '../api/set-exercise-note'
import { ISetExerciseNotePayload } from '../types/exercise.dto'

interface SetExerciseNoteVariables {
  programId: string
  exerciseId: string
  payload: ISetExerciseNotePayload
}

export function useSetExerciseNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, exerciseId, payload }: SetExerciseNoteVariables) =>
      setExerciseNote(programId, exerciseId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.programs.byId(variables.programId),
      })
    },
  })
}
