import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editTemplateSupersetName } from '../api/edit-template-superset-name'
import { IEditTemplateSupersetNamePayload } from '../types/templateSuperset.dto'

interface EditTemplateSupersetNameVaribales {
  templateId: string
  supersetId: string
  payload: IEditTemplateSupersetNamePayload
}

export function useEditTemplateSupersetName() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId, supersetId, payload }: EditTemplateSupersetNameVaribales) =>
      editTemplateSupersetName(templateId, supersetId, payload),
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.templates.byId(variables.templateId),
      })
    },
  })
}
