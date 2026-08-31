import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTemplate } from '../api/create-template'

export function useCreateTemplate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTemplate,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: queryKeys.templates.all })
    },
  })
}
