import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { unlinkAllTemplateExercises } from '../api/unlink-all-template-exercises'

interface UnlinkAllTemplateExercisesVariables {
  templateId: string
  supersetId: string
}

export function useUnlinkAllTemplateExercises() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId, supersetId }: UnlinkAllTemplateExercisesVariables) =>
      unlinkAllTemplateExercises(templateId, supersetId),
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
