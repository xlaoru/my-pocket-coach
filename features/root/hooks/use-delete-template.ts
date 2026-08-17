import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTemplate } from '../api/delete-template'

interface DeleteTemplateVariables {
  templateId: string
}

export function useDeleteTemplate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId }: DeleteTemplateVariables) => deleteTemplate(templateId),
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
