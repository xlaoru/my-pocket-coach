import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTemplateSuperset } from '../api/delete-template-superset'

interface DeleteTemplateSupersetVariables {
  templateId: string
  supersetId: string
}

export function useDeleteTemplateSuperset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId, supersetId }: DeleteTemplateSupersetVariables) =>
      deleteTemplateSuperset(templateId, supersetId),
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
