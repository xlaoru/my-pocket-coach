import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setSupersetNote } from '../api/set-superset-note'
import { ISetSupersetNotePayload } from '../types/superset.dto'

interface SetSupersetNoteVariables {
  programId: string
  supersetId: string
  payload: ISetSupersetNotePayload
}

export function useSetSupersetNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ programId, supersetId, payload }: SetSupersetNoteVariables) =>
      setSupersetNote(programId, supersetId, payload),
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.programs.byId(variables.programId),
      })
    },
  })
}
