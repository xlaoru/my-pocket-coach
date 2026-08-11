import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editTemplateDescription } from '../api/edit-template-description'
import { IEditTemplateDescriptionPayload } from '../types/templates.dto'

interface EditTemplateDescriptionVariables {
  templateId: string
  payload: IEditTemplateDescriptionPayload
}

export function useEditTemplateDescription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId, payload }: EditTemplateDescriptionVariables) =>
      editTemplateDescription(templateId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.templates.byId(variables.templateId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.templates.all,
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.programs.all,
      })
    },
  })
}
