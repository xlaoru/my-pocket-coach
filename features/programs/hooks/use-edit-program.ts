import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editProgram } from '../api/edit-program'
import { IEditProgramPayload } from '../types/program.dto'

interface EditProgramVariables {
  programId: string
  payload: IEditProgramPayload
}

export function useEditProgram() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, payload }: EditProgramVariables) => editProgram(programId, payload),
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
