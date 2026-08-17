import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editTemplateName } from '../api/edit-template-name'
import { IEditTemplateNamePayload } from '../types/templates.dto'

interface EditTemplateNameVariables {
  templateId: string
  payload: IEditTemplateNamePayload
}

export function useEditTemplateName() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId, payload }: EditTemplateNameVariables) =>
      editTemplateName(templateId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.templates.byId(variables.templateId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.templates.all,
      })
    },
  })
}
