import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { unlinkTemplateExercise } from '../api/unlink-template-exercise'

interface UnlinkTemplateExerciseVariables {
  templateId: string
  supersetId: string
  exerciseId: string
}

export function useUnlinkTemplateExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId, supersetId, exerciseId }: UnlinkTemplateExerciseVariables) =>
      unlinkTemplateExercise(templateId, supersetId, exerciseId),
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
