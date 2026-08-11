import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTemplateSuperset } from '../api/create-template-superset'
import { ICreateTemplateSupersetPayload } from '../types/templateSuperset.dto'

interface CreateTemplateSupersetVariables {
  templateId: string
  payload: ICreateTemplateSupersetPayload
}

export function useCreateTemplateSuperset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId, payload }: CreateTemplateSupersetVariables) =>
      createTemplateSuperset(templateId, payload),
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
