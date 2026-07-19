import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNewExercise } from '../api/create-new-exercises'
import { ICreateNewExercisePayload } from '../types/superset.dto'

interface CreateNewExerciseVariables {
  programId: string
  supersetId: string
  payload: ICreateNewExercisePayload
}

export function useCreateNewExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, supersetId, payload }: CreateNewExerciseVariables) =>
      createNewExercise(programId, supersetId, payload),
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
